import React, { useState, createContext, useContext, useCallback } from 'react'
import { Home, Wand2, Video, Music, Download, Play, Pause, ChevronDown, Volume2, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

// Types
export interface VideoClip {
  id: string
  name: string
  duration: string
  type: 'video' | 'audio'
}

export interface StudioConfig {
  apiEndpoint?: string
  theme?: ThemeConfig
  features?: FeatureFlags
  i18n?: LocaleConfig
}

export interface ThemeConfig {
  primaryColor?: string
  backgroundColor?: string
  borderColor?: string
}

export interface FeatureFlags {
  enableAIGeneration?: boolean
  enableVideoPreview?: boolean
  enableAudioTimeline?: boolean
}

export interface LocaleConfig {
  language: 'zh' | 'en'
  labels?: Record<string, string>
}

export type ContentTab = '剧本' | '音频' | '图片' | '视频'
export type MainTab = '短剧' | '网文小说'

// Hook
interface VideoStudioState {
  activeTab: MainTab
  selectedTool: 'works' | 'create'
  activeContentTab: ContentTab
  isPlaying: boolean
  currentTime: string
  totalTime: string
  videoClips: VideoClip[]
}

function useVideoStudio(initialState?: Partial<VideoStudioState>) {
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

  return {
    ...state,
    setActiveTab,
    setSelectedTool,
    setActiveContentTab,
    setIsPlaying
  }
}

// Context
const VideoStudioContext = createContext<ReturnType<typeof useVideoStudio> & { config: StudioConfig } | null>(null)

const useVideoStudioContext = () => {
  const context = useContext(VideoStudioContext)
  if (!context) {
    throw new Error('useVideoStudioContext must be used within VideoStudio')
  }
  return context
}

// Components
const Header: React.FC<{
  activeTab: MainTab
  onTabChange: (tab: MainTab) => void
  title?: string
}> = ({ activeTab, onTabChange, title = 'Storycraft' }) => (
  <div className="bg-white border-b border-gray-100">
    <div className="px-6 py-4">
      <div className="flex items-center justify-center relative">
        {/* Left: Logo and Brand */}
        <div className="absolute left-0 flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <span className="text-white text-lg">✨</span>
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

const Sidebar: React.FC<{
  selectedTool: 'works' | 'create'
  onToolChange: (tool: 'works' | 'create') => void
}> = ({ selectedTool, onToolChange }) => {
  const [worksExpanded, setWorksExpanded] = React.useState(false)
  const [toolsExpanded, setToolsExpanded] = React.useState(true)

  return (
    <div className="w-64 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
      <div className="p-4 space-y-1">
        {/* 作品集 */}
        <div>
          <button
            onClick={() => {
              setWorksExpanded(!worksExpanded)
              onToolChange('works')
            }}
            className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                worksExpanded ? 'rotate-0' : '-rotate-90'
              }`} />
              <span className="text-sm font-medium text-gray-700">作品集</span>
            </div>
          </button>

          {worksExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              <div className="py-8 text-center text-gray-400">
                <span className="block w-8 h-8 mx-auto mb-2 opacity-50">📁</span>
                <p className="text-xs">暂无作品</p>
              </div>
            </div>
          )}
        </div>

        {/* 创作工具 */}
        <div>
          <button
            onClick={() => setToolsExpanded(!toolsExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-2">
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                toolsExpanded ? 'rotate-0' : '-rotate-90'
              }`} />
              <span className="text-sm font-medium text-gray-700">创作工具</span>
            </div>
          </button>

          {toolsExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              <button
                onClick={() => onToolChange('create')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                  selectedTool === 'create'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center ${
                  selectedTool === 'create' ? 'bg-white/20' : 'bg-blue-50'
                }`}>
                  <Wand2 className={`w-3 h-3 ${
                    selectedTool === 'create' ? 'text-white' : 'text-blue-500'
                  }`} />
                </div>
                <span className="text-sm font-medium">一键创作</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ContentTabs: React.FC<{
  activeTab: ContentTab
  onTabChange: (tab: ContentTab) => void
}> = ({ activeTab, onTabChange }) => {
  const tabs: ContentTab[] = ['剧本', '音频', '图片', '视频']

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wand2 className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-900">一键创作</span>
          </div>

          <div className="flex items-center space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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

const PhonePreview: React.FC<{
  isPlaying: boolean
  currentTime: string
  totalTime: string
  onPlayToggle: () => void
  currentText?: string
  progress?: number
}> = ({
  isPlaying,
  currentTime,
  totalTime,
  onPlayToggle,
  currentText = '她前夫竟是看到这个场景',
  progress = 75
}) => (
  <div className="w-80 p-6 bg-gray-50 flex-shrink-0">
    <div className="relative mx-auto" style={{ width: '260px', height: '480px' }}>
      <div className="absolute inset-0 bg-black rounded-[2.5rem] p-2">
        <div className="w-full h-full bg-gray-900 rounded-[2rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-800 to-black">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-center">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-sm opacity-70">视频预览</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="mb-4">
              <p className="text-white text-sm font-medium text-center">
                {currentText}
              </p>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="text-white text-xs">{currentTime}</span>
              <div className="flex-1 bg-white/30 rounded-full h-1">
                <div
                  className="bg-white rounded-full h-1 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white text-xs">{totalTime}</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={onPlayToggle}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
            </div>
          </div>

          <div className="absolute top-2 left-4 right-4 flex justify-between items-center">
            <div className="text-white text-xs">9:41</div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-2 bg-white rounded-sm opacity-70" />
              <div className="text-white text-xs">100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Main Component
interface VideoStudioProps {
  config?: StudioConfig
  initialState?: Partial<VideoStudioState>
  className?: string
}

export const VideoStudio: React.FC<VideoStudioProps> = ({
  config = {},
  initialState,
  className = ''
}) => {
  const studioState = useVideoStudio(initialState)

  const contextValue = {
    ...studioState,
    config
  }

  return (
    <VideoStudioContext.Provider value={contextValue}>
      <div className={`h-screen bg-gray-50 flex flex-col ${className}`}>
        <Header
          activeTab={studioState.activeTab}
          onTabChange={studioState.setActiveTab}
          title={config.i18n?.labels?.title}
        />

        <div className="flex-1 flex">
          <Sidebar
            selectedTool={studioState.selectedTool}
            onToolChange={studioState.setSelectedTool}
          />

          <div className="flex-1 flex flex-col border-r border-gray-200 min-w-0 h-full">
            <ContentTabs
              activeTab={studioState.activeContentTab}
              onTabChange={studioState.setActiveContentTab}
            />

            <div className="bg-white border-b border-gray-200 px-4 py-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">音乐</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0">
              {studioState.activeContentTab === '剧本' && (
                <div className="flex flex-col h-full">
                  {/* Header - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">生成是青春颂互动短剧</h3>
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">👤</span>
                      </div>
                    </div>
                  </div>

                  {/* Script Content - Flexible Height */}
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="space-y-4">
                      {/* Scene 1 */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 text-xs font-medium">G</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">画面：1</span>
                            <span className="mx-2">时长：00:00'-00:05'</span>
                          </div>
                        </div>

                        <div className="ml-8 space-y-1 text-sm">
                          <div><span className="font-medium text-gray-700">• 景别：</span>特写→全貌</div>
                          <div><span className="font-medium text-gray-700">• 运镜：</span>镜头从上向下俯</div>
                          <div><span className="font-medium text-gray-700">• 画面：</span></div>
                          <div className="ml-4 space-y-1 text-xs text-gray-600">
                            <div>○ 从餐车间隙一个雅致的黄昏团圆【特写】开始，招牌上"桐梅·24小时"的字样在镜头不稳中，闪耀着几秒的红光。</div>
                            <div>○ 镜头【下摇】，红光在夜游瓶的所有路障面上透过一片暖阳的光照，雨在所有的红光。</div>
                            <div>○ 镜头最终定格在餐车前身的金器，凡是做情的黄昏偏在其周是在情爱有角的检测在外前提，日与：各店隐已-人重石信属情感的检查。</div>
                            <div>○ 全景：这种酒席，迟的牵城乡还通后，看似灯雨"迟滞"的电清声。</div>
                          </div>
                        </div>
                      </div>

                      {/* Scene 2 */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">画面：2</span>
                            <span className="mx-2">时长：00:05'-00:10'</span>
                          </div>
                        </div>

                        <div className="ml-8 space-y-1 text-sm">
                          <div><span className="font-medium text-gray-700">• 景别：</span>中近景</div>
                          <div><span className="font-medium text-gray-700">• 运镜：</span>固定</div>
                          <div><span className="font-medium text-gray-700">• 画面：</span>星斗·铁格。深灰色混搭绫的中等压缩得低，只融出表情的下颈线，但同调里黄雄都对目视自己也，面前的纸来是半年跟雄的获取路的先来。面前的纸来是半年跟雄的清简：所以，获对了。</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Gemini2.5pro</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          placeholder="简单描述你想要的互动剧"
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                          继续创
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {studioState.activeContentTab === '音频' && (
                <div className="flex flex-col h-full">
                  {/* Header - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">配音</h3>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Content - Flexible Height */}
                  <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
                    <div className="space-y-4">
                      {/* Voice Settings */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">已设置</span>
                        </div>

                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm">👤</span>
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-900">楚青</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <span>⏱️</span>
                              <span>试听</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <span>📋</span>
                              <span>删除</span>
                            </span>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Generated Audio */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-white border border-gray-200 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 text-sm font-bold">G</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Music className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-900">清朝少年音.mp3</span>
                          </div>
                          <div className="flex items-center space-x-2 ml-auto">
                            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-xs">♂</span>
                            </div>
                            <span className="text-sm text-gray-600">男1</span>
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                            <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs">
                              播放
                            </button>
                            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded text-xs">
                              应用
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Gemini2.5pro</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-4">男声</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          placeholder="简单描述你想要的声音风格"
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                          继续创
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {studioState.activeContentTab === '图片' && (
                <div className="flex flex-col h-full">
                  {/* Header - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">分镜4</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Content - Flexible Height */}
                  <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
                    <div className="space-y-6">
                      {/* Empty State - Middle area */}
                      <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
                        <div className="w-full h-1 bg-blue-400 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Footer - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Gemini2.5pro</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-4">背景</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-4">古风</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="text"
                          placeholder="简单描述你想要的画面风格"
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                          继续创
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {studioState.activeContentTab === '视频' && (
                <div className="flex flex-col h-full">
                  {/* Header - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pb-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">分镜1</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Content - Flexible Height */}
                  <div className="flex-1 px-6 py-4 overflow-y-auto min-h-0">
                    <div className="space-y-6">
                      {/* Empty State - Middle area */}
                      <div className="flex-1 flex items-center justify-center" style={{ minHeight: '200px' }}>
                        <div className="w-full h-1 bg-blue-400 rounded"></div>
                      </div>
                    </div>
                  </div>

                  {/* Footer - Fixed Height */}
                  <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Gemini2.5pro</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-4">视频时长 2s</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-4">分辨率 1080p</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 ml-4">单图生成</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-gray-500 text-xs">📷</span>
                          </div>
                          <input
                            type="text"
                            placeholder="简单描述你想要的画面风格"
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                          继续创
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {studioState.activeContentTab !== '剧本' && studioState.activeContentTab !== '音频' && studioState.activeContentTab !== '图片' && studioState.activeContentTab !== '视频' && (
                <div className="flex flex-col h-full p-6">
                  <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center min-h-0">
                    <div className="text-center">
                      <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">内容区域</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 bg-white border-r border-gray-200 flex flex-col min-w-0 min-h-0">
            {studioState.activeContentTab === '剧本' ? (
              <div className="flex flex-col h-full p-4">
                {/* Header - Fixed Height */}
                <div className="flex-shrink-0 flex items-center justify-between pb-3 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">剧本</span>
                    <span className="text-sm text-gray-500">1-2夜内座井工厂(分支B)</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>

                {/* Content - Flexible Height */}
                <div className="flex-1 space-y-3 mt-4 overflow-y-auto scrollbar-hide min-h-0">
                  {[1, 2, 3, 4].map((scene) => (
                    <div key={scene} className="bg-blue-50 rounded-lg p-3 relative">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs text-blue-600 font-medium">
                          画面脚本：场景{scene}的详细描述内容
                        </span>
                        <button className="p-1 hover:bg-blue-200 rounded flex-shrink-0">
                          <Download className="w-3 h-3 text-blue-600" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-800 font-medium">
                        角色对话
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : studioState.activeContentTab === '音频' ? (
              <div className="flex flex-col h-full p-4">
                {/* Header - Fixed Height */}
                <div className="flex-shrink-0 flex items-center justify-between pb-3 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">场次</span>
                    <span className="text-sm text-gray-500">1-2夜内座井工厂(分支B)</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                  <Settings className="w-4 h-4 text-gray-400" />
                </div>

                {/* Content - Flexible Height */}
                <div className="flex-1 space-y-3 mt-4 overflow-y-auto scrollbar-hide min-h-0">
                  {/* Audio clips */}
                  <div className="border rounded-lg p-3 border-2 border-blue-200 bg-blue-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs">👤</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">男1</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">她前夫竟是看到这个场景</div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">00:45-00:49</span>
                        <button className="p-1 hover:bg-blue-200 rounded">
                          <Volume2 className="w-3 h-3 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-blue-200 rounded">
                          <Download className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 border border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 text-xs">👤</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">男1</span>
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                        <div className="text-sm font-medium text-gray-900">不知道会有什么惊喜</div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">00:49-00:53</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Volume2 className="w-3 h-3 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Download className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3 border border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Music className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900">音效 需要挫败的, 沉重的 mp3</div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <span className="text-xs text-gray-500">00:49-00:59</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Volume2 className="w-3 h-3 text-gray-600" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Download className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : studioState.activeContentTab === '图片' ? (
              <div className="flex flex-col h-full p-4">
                {/* Content - Full Height */}
                <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide min-h-0">
                  {[
                    {
                      id: 1,
                      title: "真实照片质感,绿波丽特号，银灰蓝色龙装落透明光,反光时,波璃感呈突兀...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-blue-200 to-cyan-300"
                    },
                    {
                      id: 2,
                      title: "金黄色系,手绘插画,精彩,精美,神秘,华丽异域风格的调色,黑色长...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-yellow-200 to-orange-300"
                    },
                    {
                      id: 3,
                      title: "一头黑色的长发如澜布般垂落,发间点缀着古老经久饰,有的已经生锈,有的闪烁着色...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-gray-300 to-purple-300"
                    },
                    {
                      id: 4,
                      title: "高定风,漫画中国古代绝色美女,厚涂肌理,超写实,超写实,超通真,五官精致,头戴...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-red-200 to-pink-300"
                    },
                    {
                      id: 5,
                      title: "古风女,深色长发,粉纱纹汉服,花朵发饰,雨夜,愁感,颓废,疲倦,病娇,女脸上身...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-purple-200 to-pink-300"
                    }
                  ].map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-3 flex items-start space-x-3 ${
                        item.id === 4 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {item.specs}
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                        <span className={`text-lg font-bold ${item.id === 4 ? 'text-blue-600' : 'text-gray-900'}`}>
                          {item.id}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <span className="text-gray-400 text-xs">⚙️</span>
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <span className="text-gray-400 text-xs">📋</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center py-4">
                    <button className="text-blue-500 text-sm">下滑更多</button>
                  </div>
                </div>
              </div>
            ) : studioState.activeContentTab === '视频' ? (
              <div className="flex flex-col h-full p-4">
                {/* Content - Full Height */}
                <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide min-h-0">
                  {[
                    {
                      id: 1,
                      title: "真实照片质感,绿波丽特号，银灰蓝色龙装落透明光,反光时,波璃感呈突兀...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-blue-200 to-cyan-300"
                    },
                    {
                      id: 2,
                      title: "金黄色系,手绘插画,精彩,精美,神秘,华丽异域风格的调色,黑色长...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-yellow-200 to-orange-300"
                    },
                    {
                      id: 3,
                      title: "一头黑色的长发如澜布般垂落,发间点缀着古老经久饰,有的已经生锈,有的闪烁着色...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-gray-300 to-purple-300"
                    },
                    {
                      id: 4,
                      title: "高定风,漫画中国古代绝色美女,厚涂肌理,超写实,超写实,超通真,五官精致,头戴...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-red-200 to-pink-300"
                    },
                    {
                      id: 5,
                      title: "古风女,深色长发,粉纱纹汉服,花朵发饰,雨夜,愁感,颓废,疲倦,病娇,女脸上身...",
                      specs: "柯达5219胶片颗粒 | 快门速度1/48 | 色温2800K F1.8 浅景深 | 霓虹辉光度120%",
                      gradient: "from-purple-200 to-pink-300"
                    }
                  ].map((item) => (
                    <div
                      key={item.id}
                      className={`border rounded-lg p-3 flex items-start space-x-3 ${
                        item.id === 4 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <div className={`w-full h-full bg-gradient-to-br ${item.gradient}`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-500 leading-relaxed">
                          {item.specs}
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                        <span className={`text-lg font-bold ${item.id === 4 ? 'text-blue-600' : 'text-gray-900'}`}>
                          {item.id}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <span className="text-gray-400 text-xs">⚙️</span>
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <span className="text-gray-400 text-xs">📋</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="text-center py-4">
                    <button className="text-blue-500 text-sm">下滑更多</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full p-4">
                <div className="flex-1 bg-gray-50 rounded-lg flex items-center justify-center min-h-0">
                  <div className="text-center">
                    <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">时间轴区域</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <PhonePreview
            isPlaying={studioState.isPlaying}
            currentTime={studioState.currentTime}
            totalTime={studioState.totalTime}
            onPlayToggle={() => studioState.setIsPlaying(!studioState.isPlaying)}
          />
        </div>
      </div>
    </VideoStudioContext.Provider>
  )
}

export default VideoStudio