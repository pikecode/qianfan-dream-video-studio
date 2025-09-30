import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Play, Upload, Zap, Edit3, Download, Star } from 'lucide-react'
import { useVideoStore } from '@/store/videoStore'

const Home: React.FC = () => {
  const { projects, createProject } = useVideoStore()

  const recentProjects = projects.slice(0, 3)

  const handleCreateProject = () => {
    const projectName = `Video Project ${projects.length + 1}`
    createProject(projectName)
  }

  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Drag and drop your videos or browse to upload multiple files at once',
    },
    {
      icon: Edit3,
      title: 'Powerful Editing',
      description: 'Trim, cut, merge clips with precision timeline controls',
    },
    {
      icon: Zap,
      title: 'Text & Effects',
      description: 'Add custom text overlays with various fonts, colors, and animations',
    },
    {
      icon: Download,
      title: 'Export Quality',
      description: 'Export in multiple formats with customizable quality settings',
    },
  ]

  return (
    <div className="min-h-full bg-gradient-to-br from-secondary-900 via-secondary-800 to-secondary-900">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Create Amazing
              <br />
              Short Videos
            </h1>
            <p className="text-xl text-secondary-300 max-w-2xl mx-auto leading-relaxed">
              Professional video editing made simple. Upload, edit, and share your stories
              with our intuitive short video production platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/editor"
              onClick={handleCreateProject}
              className="btn-primary text-lg px-8 py-4 shadow-2xl hover:shadow-primary-500/25 transition-all duration-300"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Creating
            </Link>
            <Link
              to="/projects"
              className="btn-outline text-lg px-8 py-4"
            >
              View Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-secondary-300 text-lg max-w-2xl mx-auto">
              Powerful tools designed for creators who want to make stunning short videos
              without the complexity of traditional editing software.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-primary-600/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="py-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Recent Projects</h2>
              <Link
                to="/projects"
                className="text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                View All
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => {/* Navigate to project */}}
                >
                  <div className="aspect-video bg-secondary-700 rounded-lg mb-4 flex items-center justify-center">
                    <Play className="w-12 h-12 text-secondary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {project.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-secondary-400">
                    <span>{project.clips.length} clips</span>
                    <span>{Math.round(project.totalDuration)}s</span>
                  </div>
                  <div className="flex items-center text-xs text-secondary-500 mt-2">
                    <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="py-16"
        >
          <div className="card bg-gradient-to-r from-primary-600/20 to-accent-600/20 border-primary-500/30">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {projects.length}
                </div>
                <div className="text-secondary-300">Projects Created</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {projects.reduce((acc, project) => acc + project.clips.length, 0)}
                </div>
                <div className="text-secondary-300">Videos Edited</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">
                  {Math.round(projects.reduce((acc, project) => acc + project.totalDuration, 0))}s
                </div>
                <div className="text-secondary-300">Total Duration</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center py-16"
        >
          <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-600/10 to-accent-600/10 border-primary-500/20">
            <Star className="w-16 h-16 text-accent-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Creating?
            </h2>
            <p className="text-secondary-300 mb-8 text-lg">
              Join thousands of creators who are already making amazing short videos
              with our powerful yet simple editing tools.
            </p>
            <Link
              to="/editor"
              onClick={handleCreateProject}
              className="btn-accent text-lg px-8 py-4 shadow-xl hover:shadow-accent-500/25 transition-all duration-300"
            >
              Create Your First Video
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home