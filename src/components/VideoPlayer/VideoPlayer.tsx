import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import { formatTime } from '@/utils/timeFormat'

interface VideoPlayerProps {
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className = '' }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showControls, setShowControls] = useState(true)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const {
    currentProject,
    isPlaying,
    currentTime,
    duration,
    selectedClip,
    textOverlays,
    setIsPlaying,
    setCurrentTime,
    setDuration,
  } = useVideoStore()

  // Handle video playback
  useEffect(() => {
    const video = videoRef.current
    if (!video || !selectedClip) return

    if (isPlaying) {
      video.play().catch(console.error)
    } else {
      video.pause()
    }
  }, [isPlaying, selectedClip])

  // Update current time
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [setCurrentTime, setDuration, setIsPlaying])

  // Render text overlays on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video || !currentProject) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const renderFrame = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Draw text overlays
      textOverlays.forEach((overlay) => {
        if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
          ctx.font = `${overlay.fontSize}px ${overlay.fontFamily}`
          ctx.fillStyle = overlay.color
          ctx.textAlign = 'left'
          ctx.textBaseline = 'top'

          // Add text shadow for better visibility
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
          ctx.shadowBlur = 4
          ctx.shadowOffsetX = 2
          ctx.shadowOffsetY = 2

          ctx.fillText(overlay.text, overlay.x, overlay.y)

          // Reset shadow
          ctx.shadowColor = 'transparent'
          ctx.shadowBlur = 0
          ctx.shadowOffsetX = 0
          ctx.shadowOffsetY = 0
        }
      })

      if (isPlaying) {
        requestAnimationFrame(renderFrame)
      }
    }

    if (isPlaying) {
      renderFrame()
    }
  }, [isPlaying, currentTime, textOverlays, currentProject])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const progress = (event.clientX - rect.left) / rect.width
    const newTime = progress * duration
    setCurrentTime(newTime)

    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)

    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)

    if (videoRef.current) {
      videoRef.current.muted = newMuted
    }
  }

  const toggleFullscreen = async () => {
    const container = videoRef.current?.parentElement
    if (!container) return

    try {
      if (!isFullscreen) {
        await container.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  const skip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds))
    setCurrentTime(newTime)

    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  if (!selectedClip) {
    return (
      <div className={`${className} bg-secondary-800 rounded-lg flex items-center justify-center`}>
        <div className="text-center text-secondary-400">
          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Select a video clip to preview</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${className} relative bg-black rounded-lg overflow-hidden group`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element (hidden, used for playback) */}
      <video
        ref={videoRef}
        src={selectedClip.url}
        className="hidden"
        playsInline
        preload="metadata"
      />

      {/* Canvas for rendering video + overlays */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        width={1920}
        height={1080}
      />

      {/* Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
      >
        {/* Play/Pause Button (Center) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="p-4 bg-black/40 backdrop-blur-sm text-white rounded-full hover:bg-black/60 transition-colors duration-200"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </motion.button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
          {/* Timeline */}
          <div
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-4 group/timeline"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-primary-500 rounded-full relative transition-all duration-100"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/timeline:opacity-100 transition-opacity duration-200" />
            </div>
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlayPause}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => skip(-10)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => skip(10)}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-full slider"
                />
              </div>

              <div className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default VideoPlayer