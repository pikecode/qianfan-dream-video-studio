import React from 'react'
import { motion } from 'framer-motion'
import { useVideoStore } from '@/store/videoStore'
import { Save, Download, Undo, Redo, Play, Pause } from 'lucide-react'

const Header: React.FC = () => {
  const {
    currentProject,
    isPlaying,
    setIsPlaying,
  } = useVideoStore()

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving project...')
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting video...')
  }

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-secondary-800 border-b border-secondary-700 flex items-center justify-between px-6"
    >
      {/* Project Info */}
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-white">
          {currentProject ? currentProject.name : 'No Project Selected'}
        </h2>
        {currentProject && (
          <span className="text-sm text-secondary-400">
            {currentProject.clips.length} clips • {Math.round(currentProject.totalDuration)}s
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-3">
        {/* Playback Control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          disabled={!currentProject || currentProject.clips.length === 0}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <div className="w-px h-6 bg-secondary-600" />

        {/* Edit Controls */}
        <button
          className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
          title="Undo"
        >
          <Undo className="w-5 h-5" />
        </button>

        <button
          className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
          title="Redo"
        >
          <Redo className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-secondary-600" />

        {/* Project Controls */}
        <button
          onClick={handleSave}
          className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
          title="Save Project"
          disabled={!currentProject}
        >
          <Save className="w-5 h-5" />
        </button>

        <button
          onClick={handleExport}
          className="p-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors duration-200"
          title="Export Video"
          disabled={!currentProject || currentProject.clips.length === 0}
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </motion.header>
  )
}

export default Header