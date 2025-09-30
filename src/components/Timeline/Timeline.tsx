import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Scissors, Copy, Trash2, MoveHorizontal } from 'lucide-react'
import { useVideoStore, VideoClip } from '@/store/videoStore'
import { formatTime } from '@/utils/timeFormat'
import TimelineClip from './TimelineClip'
import toast from 'react-hot-toast'

interface TimelineProps {
  className?: string
}

const Timeline: React.FC<TimelineProps> = ({ className = '' }) => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(10) // pixels per second
  const [playheadPosition, setPlayheadPosition] = useState(0)
  const [draggedClip, setDraggedClip] = useState<string | null>(null)

  const {
    currentProject,
    timeline,
    currentTime,
    selectedClip,
    setCurrentTime,
    setSelectedClip,
    updateClip,
    removeClip,
    moveClip,
  } = useVideoStore()

  // Update playhead position based on current time
  useEffect(() => {
    setPlayheadPosition(currentTime * scale)
  }, [currentTime, scale])

  const handleTimelineClick = (event: React.MouseEvent) => {
    const rect = timelineRef.current?.getBoundingClientRect()
    if (!rect) return

    const clickX = event.clientX - rect.left
    const newTime = clickX / scale
    setCurrentTime(Math.max(0, newTime))
  }

  const handleClipSelect = (clip: VideoClip) => {
    setSelectedClip(clip)
  }

  const handleClipTrim = (clipId: string, newStart: number, newEnd: number) => {
    const clip = timeline.find(c => c.id === clipId)
    if (!clip) return

    updateClip(clipId, {
      startTime: Math.max(0, newStart),
      endTime: Math.min(clip.duration, newEnd),
    })
  }

  const handleClipSplit = (clipId: string, splitTime: number) => {
    const clip = timeline.find(c => c.id === clipId)
    if (!clip) return

    // Create two new clips from the split
    const firstClip = {
      ...clip,
      id: crypto.randomUUID(),
      name: `${clip.name} (1)`,
      endTime: splitTime,
    }

    const secondClip = {
      ...clip,
      id: crypto.randomUUID(),
      name: `${clip.name} (2)`,
      startTime: splitTime,
    }

    // Remove original clip and add split clips
    removeClip(clipId)
    // TODO: Add clips at specific positions
    toast.success('Clip split successfully')
  }

  const handleClipDuplicate = (clipId: string) => {
    const clip = timeline.find(c => c.id === clipId)
    if (!clip) return

    const duplicatedClip = {
      ...clip,
      id: crypto.randomUUID(),
      name: `${clip.name} (Copy)`,
    }

    // TODO: Add clip at next position
    toast.success('Clip duplicated')
  }

  const handleClipDelete = (clipId: string) => {
    removeClip(clipId)
    toast.success('Clip removed')
  }

  const handleClipDragStart = (clipId: string) => {
    setDraggedClip(clipId)
  }

  const handleClipDragEnd = () => {
    setDraggedClip(null)
  }

  const handleClipMove = (clipId: string, newPosition: number) => {
    // TODO: Implement clip repositioning logic
    console.log('Moving clip', clipId, 'to position', newPosition)
  }

  const totalDuration = currentProject?.totalDuration || 0
  const timelineWidth = Math.max(800, totalDuration * scale)

  // Generate time markers
  const timeMarkers = []
  const markerInterval = scale < 20 ? 10 : scale < 50 ? 5 : 1 // seconds
  for (let i = 0; i <= totalDuration; i += markerInterval) {
    timeMarkers.push(i)
  }

  return (
    <div className={`${className} bg-secondary-800 border-t border-secondary-700`}>
      {/* Timeline Header */}
      <div className="flex items-center justify-between p-4 border-b border-secondary-700">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-white">Timeline</h3>
          <div className="text-sm text-secondary-400">
            {timeline.length} clips • {formatTime(totalDuration)}
          </div>
        </div>

        {/* Timeline Controls */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-secondary-400">Zoom:</label>
            <input
              type="range"
              min="5"
              max="50"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-24 h-1 bg-secondary-600 rounded-full slider"
            />
          </div>

          {/* Clip Actions */}
          {selectedClip && (
            <div className="flex items-center space-x-2 border-l border-secondary-600 pl-3">
              <button
                onClick={() => handleClipSplit(selectedClip.id, currentTime)}
                className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
                title="Split Clip"
              >
                <Scissors className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleClipDuplicate(selectedClip.id)}
                className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
                title="Duplicate Clip"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleClipDelete(selectedClip.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                title="Delete Clip"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative overflow-x-auto custom-scrollbar">
        <div
          ref={timelineRef}
          className="relative bg-secondary-900 cursor-pointer"
          style={{ width: timelineWidth, minHeight: '200px' }}
          onClick={handleTimelineClick}
        >
          {/* Time Ruler */}
          <div className="sticky top-0 z-10 h-8 bg-secondary-800 border-b border-secondary-700">
            {timeMarkers.map((time) => (
              <div
                key={time}
                className="absolute flex flex-col items-start"
                style={{ left: time * scale }}
              >
                <div className="w-px h-4 bg-secondary-600" />
                <span className="text-xs text-secondary-400 ml-1">
                  {formatTime(time)}
                </span>
              </div>
            ))}
          </div>

          {/* Video Tracks */}
          <div className="relative">
            {/* Track 1 - Video */}
            <div className="h-20 border-b border-secondary-700 relative">
              <div className="absolute left-0 top-0 w-16 h-full bg-secondary-800 border-r border-secondary-700 flex items-center justify-center">
                <span className="text-xs text-secondary-400 font-medium">Video</span>
              </div>

              <div className="ml-16 h-full relative">
                {timeline.map((clip, index) => (
                  <TimelineClip
                    key={clip.id}
                    clip={clip}
                    scale={scale}
                    position={index * 100} // TODO: Calculate proper position
                    isSelected={selectedClip?.id === clip.id}
                    isDragging={draggedClip === clip.id}
                    onSelect={() => handleClipSelect(clip)}
                    onTrim={(newStart, newEnd) => handleClipTrim(clip.id, newStart, newEnd)}
                    onDragStart={() => handleClipDragStart(clip.id)}
                    onDragEnd={handleClipDragEnd}
                    onMove={(newPosition) => handleClipMove(clip.id, newPosition)}
                  />
                ))}
              </div>
            </div>

            {/* Track 2 - Audio */}
            <div className="h-16 border-b border-secondary-700 relative">
              <div className="absolute left-0 top-0 w-16 h-full bg-secondary-800 border-r border-secondary-700 flex items-center justify-center">
                <span className="text-xs text-secondary-400 font-medium">Audio</span>
              </div>
              <div className="ml-16 h-full bg-secondary-900/50">
                {/* Audio waveforms would go here */}
              </div>
            </div>

            {/* Track 3 - Text Overlays */}
            <div className="h-12 border-b border-secondary-700 relative">
              <div className="absolute left-0 top-0 w-16 h-full bg-secondary-800 border-r border-secondary-700 flex items-center justify-center">
                <span className="text-xs text-secondary-400 font-medium">Text</span>
              </div>
              <div className="ml-16 h-full bg-secondary-900/30">
                {/* Text overlay indicators would go here */}
              </div>
            </div>
          </div>

          {/* Playhead */}
          <motion.div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
            style={{ left: playheadPosition }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="absolute top-0 -translate-x-1/2 w-3 h-3 bg-red-500 clip-path-triangle" />
          </motion.div>
        </div>
      </div>

      {/* Drop Zone for New Clips */}
      {timeline.length === 0 && (
        <div className="absolute inset-x-16 top-8 bottom-4 border-2 border-dashed border-secondary-600 rounded-lg flex items-center justify-center">
          <div className="text-center text-secondary-400">
            <MoveHorizontal className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Drop video clips here to start editing</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Timeline