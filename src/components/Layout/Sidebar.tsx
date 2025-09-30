import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  Video,
  FolderOpen,
  Settings,
  Film,
} from 'lucide-react'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Editor', href: '/editor', icon: Video },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const Sidebar: React.FC = () => {
  const location = useLocation()

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-secondary-800 border-r border-secondary-700 flex flex-col"
    >
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-secondary-700">
        <Film className="w-8 h-8 text-primary-500 mr-3" />
        <h1 className="text-xl font-bold text-white">VideoEdit</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 w-1 h-8 bg-primary-400 rounded-r-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-secondary-700">
        <div className="text-xs text-secondary-400 text-center">
          Video Editor v1.0.0
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar