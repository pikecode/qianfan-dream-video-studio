import React from 'react'
import { FileText, Music, Image, Video, Sparkles } from 'lucide-react'
import type { ContentTab } from '../../types'

interface ContentTabsProps {
  activeTab: ContentTab
  onTabChange: (tab: ContentTab) => void
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: '剧本' as ContentTab, label: '剧本', icon: FileText, color: 'text-green-600' },
    { id: '音频' as ContentTab, label: '音频', icon: Music, color: 'text-purple-600' },
    { id: '图片' as ContentTab, label: '图片', icon: Image, color: 'text-blue-600' },
    { id: '视频' as ContentTab, label: '视频', icon: Video, color: 'text-red-600' }
  ]

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Title */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-900">一键创作</span>
          </div>

          {/* Right: Content Tabs */}
          <div className="flex items-center space-x-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}