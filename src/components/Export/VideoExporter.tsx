import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, Settings, Film, Clock, FileType } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import toast from 'react-hot-toast'

interface ExportSettings {
  format: 'mp4' | 'webm' | 'mov'
  quality: 'low' | 'medium' | 'high' | 'ultra'
  resolution: '480p' | '720p' | '1080p' | '4k'
  fps: 24 | 30 | 60
  bitrate: number
}

interface VideoExporterProps {
  className?: string
}

const VideoExporter: React.FC<VideoExporterProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  const { currentProject, timeline, textOverlays } = useVideoStore()

  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: 'mp4',
    quality: 'high',
    resolution: '1080p',
    fps: 30,
    bitrate: 5000,
  })

  const qualityPresets = {
    low: { bitrate: 1000, description: 'Small file size, lower quality' },
    medium: { bitrate: 2500, description: 'Balanced quality and size' },
    high: { bitrate: 5000, description: 'High quality, larger file size' },
    ultra: { bitrate: 10000, description: 'Maximum quality, very large file' },
  }

  const resolutionSettings = {
    '480p': { width: 854, height: 480 },
    '720p': { width: 1280, height: 720 },
    '1080p': { width: 1920, height: 1080 },
    '4k': { width: 3840, height: 2160 },
  }

  const handleExport = async () => {
    if (!currentProject || timeline.length === 0) {
      toast.error('No video clips to export')
      return
    }

    setIsExporting(true)
    setExportProgress(0)

    try {
      // This is a simplified export simulation
      // In a real application, you would use FFmpeg.wasm or a server-side solution
      await simulateExport()

      toast.success('Video exported successfully!')
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Failed to export video')
    } finally {
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  const simulateExport = async (): Promise<void> => {
    const totalFrames = Math.floor(currentProject!.totalDuration * exportSettings.fps)

    for (let frame = 0; frame < totalFrames; frame++) {
      // Simulate processing each frame
      await new Promise(resolve => setTimeout(resolve, 10))

      const progress = (frame / totalFrames) * 100
      setExportProgress(progress)
    }

    // Create a download link with dummy data
    const blob = new Blob(['Exported video data would be here'], {
      type: `video/${exportSettings.format}`
    })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${currentProject!.name}.${exportSettings.format}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getEstimatedFileSize = (): string => {
    if (!currentProject) return '0 MB'

    const durationInMinutes = currentProject.totalDuration / 60
    const bitrateMbps = exportSettings.bitrate / 1000
    const sizeInMB = durationInMinutes * bitrateMbps * 60 / 8

    return `~${sizeInMB.toFixed(1)} MB`
  }

  const getEstimatedTime = (): string => {
    if (!currentProject) return '0s'

    // Very rough estimation: processing time is usually 2-5x the video duration
    const estimatedSeconds = currentProject.totalDuration * 3

    if (estimatedSeconds < 60) {
      return `~${Math.round(estimatedSeconds)}s`
    } else {
      const minutes = Math.floor(estimatedSeconds / 60)
      const seconds = Math.round(estimatedSeconds % 60)
      return `~${minutes}m ${seconds}s`
    }
  }

  return (
    <div className={`${className} bg-secondary-800 rounded-lg`}>
      <div className="p-4 border-b border-secondary-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-accent-500" />
            <h3 className="text-lg font-semibold text-white">Export Video</h3>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              showSettings
                ? 'bg-primary-600 text-white'
                : 'text-secondary-400 hover:text-white hover:bg-secondary-700'
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Project Info */}
        {currentProject && (
          <div className="bg-secondary-900 rounded-lg p-4">
            <h4 className="text-sm font-medium text-white mb-2">Project Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Film className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-300">{timeline.length} clips</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-300">{Math.round(currentProject.totalDuration)}s duration</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileType className="w-4 h-4 text-secondary-400" />
                <span className="text-secondary-300">{textOverlays.length} text overlays</span>
              </div>
            </div>
          </div>
        )}

        {/* Export Settings */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Format and Quality */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Format
                </label>
                <select
                  value={exportSettings.format}
                  onChange={(e) => setExportSettings(prev => ({
                    ...prev,
                    format: e.target.value as ExportSettings['format']
                  }))}
                  className="input"
                >
                  <option value="mp4">MP4 (Recommended)</option>
                  <option value="webm">WebM</option>
                  <option value="mov">MOV</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Quality
                </label>
                <select
                  value={exportSettings.quality}
                  onChange={(e) => {
                    const quality = e.target.value as ExportSettings['quality']
                    setExportSettings(prev => ({
                      ...prev,
                      quality,
                      bitrate: qualityPresets[quality].bitrate
                    }))
                  }}
                  className="input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="ultra">Ultra</option>
                </select>
                <p className="text-xs text-secondary-400 mt-1">
                  {qualityPresets[exportSettings.quality].description}
                </p>
              </div>
            </div>

            {/* Resolution and FPS */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Resolution
                </label>
                <select
                  value={exportSettings.resolution}
                  onChange={(e) => setExportSettings(prev => ({
                    ...prev,
                    resolution: e.target.value as ExportSettings['resolution']
                  }))}
                  className="input"
                >
                  <option value="480p">480p (854×480)</option>
                  <option value="720p">720p (1280×720)</option>
                  <option value="1080p">1080p (1920×1080)</option>
                  <option value="4k">4K (3840×2160)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Frame Rate
                </label>
                <select
                  value={exportSettings.fps}
                  onChange={(e) => setExportSettings(prev => ({
                    ...prev,
                    fps: Number(e.target.value) as ExportSettings['fps']
                  }))}
                  className="input"
                >
                  <option value={24}>24 FPS</option>
                  <option value={30}>30 FPS</option>
                  <option value={60}>60 FPS</option>
                </select>
              </div>
            </div>

            {/* Advanced Settings */}
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Bitrate (kbps)
              </label>
              <input
                type="range"
                min="500"
                max="20000"
                step="100"
                value={exportSettings.bitrate}
                onChange={(e) => setExportSettings(prev => ({
                  ...prev,
                  bitrate: Number(e.target.value)
                }))}
                className="w-full h-2 bg-secondary-600 rounded-lg slider"
              />
              <div className="flex justify-between text-xs text-secondary-400 mt-1">
                <span>500</span>
                <span>{exportSettings.bitrate} kbps</span>
                <span>20000</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Export Info */}
        <div className="bg-secondary-900 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-secondary-400">Estimated Size:</span>
              <span className="text-white ml-2 font-medium">{getEstimatedFileSize()}</span>
            </div>
            <div>
              <span className="text-secondary-400">Estimated Time:</span>
              <span className="text-white ml-2 font-medium">{getEstimatedTime()}</span>
            </div>
          </div>
        </div>

        {/* Export Progress */}
        {isExporting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-secondary-300">Exporting video...</span>
              <span className="text-white font-medium">{Math.round(exportProgress)}%</span>
            </div>
            <div className="w-full bg-secondary-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                style={{ width: `${exportProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={!currentProject || timeline.length === 0 || isExporting}
          className={`w-full btn ${
            isExporting
              ? 'bg-secondary-600 text-secondary-400 cursor-not-allowed'
              : 'btn-accent'
          } flex items-center justify-center space-x-2`}
        >
          <Download className="w-5 h-5" />
          <span>
            {isExporting
              ? 'Exporting...'
              : `Export as ${exportSettings.format.toUpperCase()}`
            }
          </span>
        </button>

        {/* Export Requirements */}
        {(!currentProject || timeline.length === 0) && (
          <div className="text-center text-secondary-400 py-4">
            <Film className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">
              {!currentProject
                ? 'Create a project to start exporting'
                : 'Add video clips to your timeline first'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoExporter