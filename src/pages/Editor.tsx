import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Video, Type, Download, Save } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import VideoUpload from '@/components/VideoUpload/VideoUpload'
import VideoPlayer from '@/components/VideoPlayer/VideoPlayer'
import Timeline from '@/components/Timeline/Timeline'
import TextOverlayEditor from '@/components/TextOverlay/TextOverlayEditor'
import VideoExporter from '@/components/Export/VideoExporter'

const Editor: React.FC = () => {
  const [activePanel, setActivePanel] = useState<'upload' | 'text' | 'export'>('upload')
  const { currentProject, timeline } = useVideoStore()

  const panels = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'export', label: 'Export', icon: Download },
  ]

  const renderPanel = () => {
    switch (activePanel) {
      case 'upload':
        return <VideoUpload />
      case 'text':
        return <TextOverlayEditor />
      case 'export':
        return <VideoExporter />
      default:
        return <VideoUpload />
    }
  }

  return (
    <div className="h-full flex flex-col bg-secondary-900">
      {/* Editor Header */}
      <div className="h-16 bg-secondary-800 border-b border-secondary-700 flex items-center px-6">
        <div className="flex items-center space-x-4">
          <Video className="w-6 h-6 text-primary-500" />
          <h1 className="text-xl font-semibold text-white">Video Editor</h1>
          {currentProject && (
            <span className="text-secondary-400">• {currentProject.name}</span>
          )}
        </div>
      </div>

      {/* Main Editor Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-80 bg-secondary-800 border-r border-secondary-700 flex flex-col"
        >
          {/* Panel Tabs */}
          <div className="flex border-b border-secondary-700">
            {panels.map((panel) => (
              <button
                key={panel.id}
                onClick={() => setActivePanel(panel.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                  activePanel === panel.id
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-700'
                }`}
              >
                <panel.icon className="w-4 h-4" />
                <span>{panel.label}</span>
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderPanel()}
            </motion.div>
          </div>
        </motion.div>

        {/* Center - Video Player */}
        <div className="flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 p-6"
          >
            <VideoPlayer className="w-full h-full max-h-[calc(100vh-300px)]" />
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="h-64 border-t border-secondary-700"
          >
            <Timeline className="h-full" />
          </motion.div>
        </div>
      </div>

      {/* Quick Start Guide */}
      {(!currentProject || timeline.length === 0) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute inset-0 bg-secondary-900/95 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <div className="max-w-md text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-secondary-800 rounded-xl p-8 shadow-2xl border border-secondary-700"
            >
              <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-primary-400" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-4">
                Let's Get Started!
              </h2>

              <p className="text-secondary-300 mb-6 leading-relaxed">
                {!currentProject
                  ? 'Create a new project or select an existing one to begin editing your videos.'
                  : 'Upload your first video to start creating amazing content.'
                }
              </p>

              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3 text-sm text-secondary-300">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <span>Upload your video files</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-secondary-300">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <span>Edit clips on the timeline</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-secondary-300">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <span>Add text overlays and effects</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-secondary-300">
                  <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <span>Export your final video</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActivePanel('upload')}
                className="w-full btn-primary mt-6"
              >
                Start Uploading
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Editor