import React from 'react'
import { VideoStudio } from '@qianfan/video-studio'
import type { StudioConfig } from '@qianfan/video-studio'

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
      <VideoStudio
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