import { useState, useCallback } from 'react'
import { getTranslations, type Language } from '../locales'

export const useI18n = (initialLanguage: Language = 'zh') => {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  const translations = getTranslations(language)

  const t = useCallback((key: string, fallback?: string) => {
    return (translations as Record<string, string>)[key] || fallback || key
  }, [translations])

  const changeLanguage = useCallback((newLanguage: Language) => {
    setLanguage(newLanguage)
  }, [])

  return {
    language,
    setLanguage: changeLanguage,
    t
  }
}