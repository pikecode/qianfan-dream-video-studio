import React, { createContext, useContext } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { ContentTabs } from '../ContentTabs'
import { PhonePreview } from '../PhonePreview'
import { ContentArea } from '../ContentArea'
import { MediaTimeline } from '../MediaTimeline'
import { useVideoStudio } from '../../hooks/useVideoStudio'
import { I18nProvider } from '../../contexts/I18nContext'
import type { VideoStudioState } from '../../hooks/useVideoStudio'
import type { StudioConfig, Language } from '../../types'

interface VideoStudioContextValue extends ReturnType<typeof useVideoStudio> {
  config: StudioConfig
}

const VideoStudioContext = createContext<VideoStudioContextValue | null>(null)

export const useVideoStudioContext = () => {
  const context = useContext(VideoStudioContext)
  if (!context) {
    throw new Error('useVideoStudioContext must be used within VideoStudioProvider')
  }
  return context
}

interface VideoStudioProps {
  config?: StudioConfig
  initialState?: Partial<VideoStudioState>
  className?: string
  language?: Language
}

export const VideoStudio: React.FC<VideoStudioProps> = ({
  config = {},
  initialState,
  className = '',
  language = 'zh'
}) => {
  const studioState = useVideoStudio(initialState)

  const contextValue: VideoStudioContextValue = {
    ...studioState,
    config
  }

  return (
    <I18nProvider initialLanguage={language}>
      <VideoStudioContext.Provider value={contextValue}>
        <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
          {/* Header */}
          <Header
            activeTab={studioState.activeTab}
            onTabChange={studioState.setActiveTab}
            title={config.i18n?.labels?.title}
          />

          {/* Main Content - 4 Horizontal Sections */}
          <div className="flex-1 flex">
            {/* Sidebar */}
            <Sidebar
              selectedTool={studioState.selectedTool}
              onToolChange={studioState.setSelectedTool}
            />

            {/* Content Area */}
            <div className="flex-1 flex flex-col border-r border-gray-200 min-w-0">
              <ContentTabs
                activeTab={studioState.activeContentTab}
                onTabChange={studioState.setActiveContentTab}
              />
              <ContentArea />
            </div>

            {/* Media Timeline */}
            <MediaTimeline />

            {/* Phone Preview */}
            <PhonePreview
              isPlaying={studioState.isPlaying}
              currentTime={studioState.currentTime}
              totalTime={studioState.totalTime}
              onPlayToggle={() => studioState.setIsPlaying(!studioState.isPlaying)}
            />
          </div>
        </div>
      </VideoStudioContext.Provider>
    </I18nProvider>
  )
}

// Export provider for advanced usage
export const VideoStudioProvider = VideoStudioContext.Provider
export { useVideoStudio }