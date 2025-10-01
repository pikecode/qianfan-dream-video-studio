export type Language = 'zh' | 'en'

export interface I18nConfig {
  language: Language
  translations: Record<string, Record<string, string>>
}

export interface I18nContext {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, fallback?: string) => string
}