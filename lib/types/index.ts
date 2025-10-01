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

// Re-export i18n types
export type { Language, I18nConfig, I18nContext } from './i18n'

export interface GenerationOptions {
  model?: string
  style?: string
  duration?: string
  resolution?: string
}