// Main components
export { VideoStudio, VideoStudioProvider } from './components/VideoStudio'
export { Header } from './components/VideoStudio/Header'
export { Sidebar } from './components/VideoStudio/Sidebar'
export { ContentTabs } from './components/ContentTabs'
export { ContentArea } from './components/ContentArea'
export { MediaTimeline } from './components/MediaTimeline'
export { PhonePreview } from './components/PhonePreview'

// Hooks
export { useVideoStudio } from './hooks/useVideoStudio'
export { useI18n } from './hooks/useI18n'

// I18n
export { I18nProvider, useI18nContext } from './contexts/I18nContext'
export { locales, getTranslations } from './locales'

// Types
export type {
  VideoClip,
  StudioConfig,
  ThemeConfig,
  FeatureFlags,
  LocaleConfig,
  ContentTab,
  MainTab,
  GenerationOptions,
  Language,
  I18nConfig,
  I18nContext
} from './types'

// Utils (can be added later)
// export * from './utils'