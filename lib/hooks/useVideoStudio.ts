import { useState, useCallback } from 'react'
import type { ContentTab, MainTab, VideoClip } from '../types'

export interface VideoStudioState {
  activeTab: MainTab
  selectedTool: 'works' | 'create'
  activeContentTab: ContentTab
  isPlaying: boolean
  currentTime: string
  totalTime: string
  videoClips: VideoClip[]
}

export function useVideoStudio(initialState?: Partial<VideoStudioState>) {
  const [state, setState] = useState<VideoStudioState>({
    activeTab: '短剧',
    selectedTool: 'create',
    activeContentTab: '音频',
    isPlaying: false,
    currentTime: '00:45',
    totalTime: '01:00',
    videoClips: [
      { id: '1', name: '她前夫竟是看到这个场景', duration: '00:45-00:49', type: 'video' },
      { id: '2', name: '不知道会有什么惊喜', duration: '00:49-00:53', type: 'video' },
      { id: '3', name: '音乐 南京板鸭的.mp3', duration: '00:49-00:59', type: 'audio' }
    ],
    ...initialState
  })

  const setActiveTab = useCallback((tab: MainTab) => {
    setState(prev => ({ ...prev, activeTab: tab }))
  }, [])

  const setSelectedTool = useCallback((tool: 'works' | 'create') => {
    setState(prev => ({ ...prev, selectedTool: tool }))
  }, [])

  const setActiveContentTab = useCallback((tab: ContentTab) => {
    setState(prev => ({ ...prev, activeContentTab: tab }))
  }, [])

  const setIsPlaying = useCallback((playing: boolean) => {
    setState(prev => ({ ...prev, isPlaying: playing }))
  }, [])

  const updateTime = useCallback((currentTime: string, totalTime?: string) => {
    setState(prev => ({
      ...prev,
      currentTime,
      ...(totalTime && { totalTime })
    }))
  }, [])

  const addVideoClip = useCallback((clip: VideoClip) => {
    setState(prev => ({
      ...prev,
      videoClips: [...prev.videoClips, clip]
    }))
  }, [])

  const removeVideoClip = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      videoClips: prev.videoClips.filter(clip => clip.id !== id)
    }))
  }, [])

  return {
    ...state,
    setActiveTab,
    setSelectedTool,
    setActiveContentTab,
    setIsPlaying,
    updateTime,
    addVideoClip,
    removeVideoClip
  }
}