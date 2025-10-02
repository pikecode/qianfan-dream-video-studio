import { useState, useCallback, useMemo } from 'react'
import { getTranslations, type Language } from '../locales'

export const useI18n = (initialLanguage: Language = 'zh') => {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  const translations = useMemo(() => getTranslations(language), [language])

  const t = useCallback((key: string, fallback?: string) => {
    return (translations as Record<string, string>)[key] || fallback || key
  }, [translations])

  return {
    language,
    setLanguage,
    t
  }
}