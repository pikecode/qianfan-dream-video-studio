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
  return (
    <div className="App">
      {/* Info panel */}
      <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-xs">
        <h3 className="text-sm font-semibold mb-2 text-gray-800">多语言演示</h3>
        <p className="text-xs text-gray-600">使用右上角的语言切换器测试中英文切换功能</p>
      </div>

      <VideoStudio
        language="zh"
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