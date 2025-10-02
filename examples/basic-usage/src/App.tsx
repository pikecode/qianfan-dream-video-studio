import React, { useState, useEffect, useRef } from 'react'
import { VideoStudio } from '@qianfan/video-studio'
import type { StudioConfig, Language } from '@qianfan/video-studio'

const config: StudioConfig = {
  apiEndpoint: 'https://api.example.com',
  theme: {
    primaryColor: '#3B82F6',
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB'
  },
  features: {
    enableAIGeneration: true,
    enableVideoPreview: true,
    enableAudioTimeline: true
  },
  i18n: {
    language: 'zh',
    labels: {
      title: 'Storycraft'
    }
  }
}

function App() {
  const [language, setLanguage] = useState<Language>('zh')
  const [isExpanded, setIsExpanded] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // 点击外部自动收起
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const getLanguageFlag = (lang: Language) => {
    switch (lang) {
      case 'zh': return '🇨🇳'
      case 'en': return '🇺🇸'
      case 'ja': return '🇯🇵'
      default: return '🇨🇳'
    }
  }

  const getLanguageDisplay = (lang: Language) => {
    switch (lang) {
      case 'zh': return '中文'
      case 'en': return 'EN'
      case 'ja': return '日本'
      default: return '中文'
    }
  }

  return (
    <div className="App">
      {/* Demo Language Switcher */}
      <div ref={dropdownRef} className="fixed top-4 left-4 z-50">
        {/* Collapsed State - Language Toggle Button */}
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="group bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl border border-gray-200 rounded-lg px-3 py-2 transition-all duration-200 flex items-center space-x-2"
          >
            <span className="text-lg">{getLanguageFlag(language)}</span>
            <span className="text-sm font-medium text-gray-700">{getLanguageDisplay(language)}</span>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {/* Expanded State - Language Options */}
        {isExpanded && (
          <div className="bg-white shadow-xl border border-gray-200 rounded-lg p-3 min-w-[140px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <div className="flex items-center space-x-1">
                <span className="text-sm">🎮</span>
                <span className="text-xs font-medium text-gray-600">演示</span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Language Options */}
            <div className="space-y-1">
              {[
                { code: 'zh' as Language, flag: '🇨🇳', name: '中文' },
                { code: 'en' as Language, flag: '🇺🇸', name: 'English' },
                { code: 'ja' as Language, flag: '🇯🇵', name: '日本語' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsExpanded(false)
                  }}
                  className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded text-sm transition-all duration-150 ${
                    language === lang.code
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {language === lang.code && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* Tip */}
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                右上角为组件内置切换器
              </p>
            </div>
          </div>
        )}
      </div>

      <VideoStudio
        language={language}
        config={config}
        initialState={{
          activeTab: '短剧',
          activeContentTab: '音频'
        }}
      />
    </div>
  )
}

export default App