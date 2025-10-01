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

  const dynamicConfig: StudioConfig = {
    ...config,
    i18n: {
      language,
      labels: {
        title: 'Storycraft'
      }
    }
  }

  return (
    <div className="App">
      {/* Language Demo Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-semibold mb-3 text-gray-800">多语言测试 / Language Test</h3>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => setLanguage('zh')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              language === 'zh'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            中文 (Chinese)
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              language === 'en'
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            English
          </button>
        </div>
      </div>

      <VideoStudio
        language={language}
        config={dynamicConfig}
        initialState={{
          activeTab: '短剧',
          activeContentTab: '音频'
        }}
      />
    </div>
  )
}

export default App