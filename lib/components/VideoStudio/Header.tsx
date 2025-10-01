import React from 'react'
import { Sparkles, Globe } from 'lucide-react'
import { useI18nContext } from '../../contexts/I18nContext'
import type { MainTab, Language } from '../../types'

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
  const { t, language, setLanguage } = useI18nContext()

  const tabs: { id: MainTab; key: string }[] = [
    { id: '短剧', key: 'nav.shortVideo' },
    { id: '网文小说', key: 'nav.webNovel' }
  ]

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">{title}</span>
          </div>

          {/* Center: Navigation Tabs */}
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {t(tab.key)}
              </button>
            ))}
          </div>

          {/* Right: Language Switcher */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="pl-8 pr-3 py-1 text-sm border border-gray-200 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="zh">中文</option>
                <option value="en">English</option>
              </select>
              <Globe className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}