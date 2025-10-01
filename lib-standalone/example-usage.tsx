import React from 'react'
import VideoStudio from './VideoStudio'
import type { StudioConfig } from './VideoStudio'

// 示例1: 基础使用
export const BasicExample = () => {
  const config: StudioConfig = {
    apiEndpoint: 'https://api.example.com',
    theme: {
      primaryColor: '#3B82F6'
    }
  }

  return <VideoStudio config={config} />
}

// 示例2: 自定义主题
export const CustomThemeExample = () => {
  const config: StudioConfig = {
    theme: {
      primaryColor: '#10B981',      // 绿色主题
      backgroundColor: '#F0FDF4',   // 浅绿背景
      borderColor: '#BBF7D0'        // 绿色边框
    },
    features: {
      enableAIGeneration: true,
      enableVideoPreview: true,
      enableAudioTimeline: false    // 禁用音频时间轴
    }
  }

  return <VideoStudio config={config} />
}

// 示例3: 国际化配置
export const I18nExample = () => {
  const config: StudioConfig = {
    i18n: {
      language: 'zh',
      labels: {
        title: '我的专属视频工作室',
        // 可以添加更多自定义文案
      }
    }
  }

  return <VideoStudio config={config} />
}

// 示例4: 初始状态配置
export const InitialStateExample = () => {
  return (
    <VideoStudio
      config={{
        apiEndpoint: 'https://api.example.com'
      }}
      initialState={{
        activeTab: '网文小说',           // 默认选中网文小说
        activeContentTab: '图片',       // 默认选中图片tab
        isPlaying: false,
        currentTime: '00:00',
        totalTime: '02:00'
      }}
    />
  )
}

// 示例5: 完整配置
export const FullConfigExample = () => {
  const config: StudioConfig = {
    apiEndpoint: 'https://your-api-endpoint.com',
    theme: {
      primaryColor: '#8B5CF6',       // 紫色主题
      backgroundColor: '#FAF5FF',
      borderColor: '#DDD6FE'
    },
    features: {
      enableAIGeneration: true,
      enableVideoPreview: true,
      enableAudioTimeline: true
    },
    i18n: {
      language: 'zh',
      labels: {
        title: '专业视频制作工作室',
        // 可扩展更多文案
      }
    }
  }

  const initialState = {
    activeTab: '短剧' as const,
    activeContentTab: '剧本' as const,
    selectedTool: 'create' as const,
    isPlaying: false,
    currentTime: '00:00',
    totalTime: '01:30',
    // 自定义视频片段
    videoClips: [
      { id: '1', name: '开场白', duration: '00:00-00:15', type: 'video' as const },
      { id: '2', name: '主要内容', duration: '00:15-01:00', type: 'video' as const },
      { id: '3', name: '背景音乐', duration: '00:00-01:30', type: 'audio' as const }
    ]
  }

  return (
    <VideoStudio
      config={config}
      initialState={initialState}
      className="custom-video-studio" // 自定义CSS类名
    />
  )
}

// 在实际项目中的使用示例
export const ProjectIntegrationExample = () => {
  // 可以从环境变量或配置文件读取
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:3000/api'

  const config: StudioConfig = {
    apiEndpoint,
    theme: {
      primaryColor: '#2563EB'  // 从设计系统获取
    },
    features: {
      enableAIGeneration: true,
      enableVideoPreview: true,
      enableAudioTimeline: true
    }
  }

  // 可以从用户设置或URL参数获取初始状态
  const getInitialState = () => {
    const savedState = localStorage.getItem('video-studio-state')
    if (savedState) {
      try {
        return JSON.parse(savedState)
      } catch {
        return undefined
      }
    }
    return undefined
  }

  return (
    <div className="w-full h-screen">
      <VideoStudio
        config={config}
        initialState={getInitialState()}
      />
    </div>
  )
}