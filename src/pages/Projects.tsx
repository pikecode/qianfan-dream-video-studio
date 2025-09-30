import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Play,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Clock,
  Video,
} from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'
import { formatTime, formatDuration } from '@/utils/timeFormat'
import toast from 'react-hot-toast'

const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'updated' | 'duration'>('updated')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const {
    projects,
    createProject,
    deleteProject,
    setCurrentProject,
  } = useVideoStore()

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name) * multiplier
        case 'created':
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * multiplier
        case 'updated':
          return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * multiplier
        case 'duration':
          return (a.totalDuration - b.totalDuration) * multiplier
        default:
          return 0
      }
    })

  const handleCreateProject = () => {
    const name = prompt('Enter project name:')
    if (name && name.trim()) {
      createProject(name.trim())
      toast.success('Project created successfully!')
    }
  }

  const handleDeleteProject = (projectId: string, projectName: string) => {
    if (confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      deleteProject(projectId)
      toast.success('Project deleted successfully!')
    }
  }

  const handleDuplicateProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      const newName = `${project.name} (Copy)`
      createProject(newName)
      // TODO: Copy project content
      toast.success('Project duplicated successfully!')
    }
  }

  const handleOpenProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId)
    if (project) {
      setCurrentProject(project)
    }
  }

  return (
    <div className="h-full bg-secondary-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
            <p className="text-secondary-400">
              {projects.length} project{projects.length !== 1 ? 's' : ''} total
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateProject}
            className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </motion.button>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-secondary-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input w-auto min-w-[120px]"
            >
              <option value="updated">Last Updated</option>
              <option value="created">Date Created</option>
              <option value="name">Name</option>
              <option value="duration">Duration</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          {/* View Mode */}
          <div className="flex bg-secondary-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-primary-600 text-white'
                  : 'text-secondary-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Projects */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-12 h-12 text-secondary-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {searchQuery ? 'No projects found' : 'No projects yet'}
            </h2>
            <p className="text-secondary-400 mb-8 max-w-md mx-auto">
              {searchQuery
                ? 'Try adjusting your search terms or filters.'
                : 'Create your first project to start making amazing videos!'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={handleCreateProject}
                className="btn-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create First Project
              </button>
            )}
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-secondary-700 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <Play className="w-12 h-12 text-secondary-400 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(project.totalDuration)}
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2 truncate">
                    {project.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-secondary-400 mb-2">
                    <span>{project.clips.length} clips</span>
                    <span>{project.textOverlays.length} overlays</span>
                  </div>
                  <div className="text-xs text-secondary-500">
                    Updated {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to="/editor"
                    onClick={() => handleOpenProject(project.id)}
                    className="flex-1 btn-primary text-sm flex items-center justify-center space-x-1"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => handleDuplicateProject(project.id)}
                    className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id, project.name)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* List View */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card hover:shadow-lg transition-all duration-300 hover:bg-secondary-750"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-16 h-10 bg-secondary-700 rounded flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-secondary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-secondary-400">
                        <span>{project.clips.length} clips</span>
                        <span>{project.textOverlays.length} overlays</span>
                        <span>{formatDuration(project.totalDuration)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right text-sm text-secondary-500 hidden md:block">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        to="/editor"
                        onClick={() => handleOpenProject(project.id)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDuplicateProject(project.id)}
                        className="p-2 text-secondary-400 hover:text-white hover:bg-secondary-700 rounded-lg transition-all duration-200"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id, project.name)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects