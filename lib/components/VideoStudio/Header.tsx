import React from 'react'
import { Sparkles } from 'lucide-react'
import type { MainTab } from '../../types'

interface HeaderProps {
  activeTab: MainTab
  onTabChange: (tab: MainTab) => void
  title?: string
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  title = 'Storycraft'
}) => {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-center relative">
          {/* Left: Logo and Brand */}
          <div className="absolute left-0 flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">{title}</span>
          </div>

          {/* Center: Navigation Tabs */}
          <div className="flex items-center space-x-1">
            {(['短剧', '网文小说'] as MainTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}