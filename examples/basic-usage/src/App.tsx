import React, { useState } from 'react'
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

  const getLanguageDisplay = (lang: Language) => {
    switch (lang) {
      case 'zh': return '中文'
      case 'en': return 'English'
      case 'ja': return '日本語'
      default: return '中文'
    }
  }

  return (
    <div className="App">
      {/* Enhanced Language Demo Switcher */}
      <div className="fixed top-4 right-4 z-50 bg-white shadow-xl rounded-xl p-5 border border-gray-200 backdrop-blur-sm bg-white/95 min-w-[280px]">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🌐</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-800">多语言演示 / Language Demo</h3>
        </div>

        <p className="text-xs text-gray-600 mb-4 leading-relaxed">
          <span className="font-medium">两种切换方式：</span><br/>
          • 下方按钮 (演示快捷切换)<br/>
          • Header右上角下拉菜单 (组件内置)
        </p>

        <div className="grid grid-cols-1 gap-2 mb-4">
          <button
            onClick={() => setLanguage('zh')}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform ${
              language === 'zh'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-102'
            }`}
          >
            <span className="text-base">🇨🇳</span>
            <span>中文 (简体)</span>
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform ${
              language === 'en'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-102'
            }`}
          >
            <span className="text-base">🇺🇸</span>
            <span>English</span>
          </button>
          <button
            onClick={() => setLanguage('ja')}
            className={`flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 transform ${
              language === 'ja'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md scale-105'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-102'
            }`}
          >
            <span className="text-base">🇯🇵</span>
            <span>日本語</span>
          </button>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">当前语言:</span>
            <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
              {getLanguageDisplay(language)}
            </span>
          </div>
        </div>
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