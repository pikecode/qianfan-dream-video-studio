import React, { createContext, useContext, useEffect } from 'react'
import { useI18n } from '../hooks/useI18n'
import type { Language } from '../locales'
import type { I18nContext } from '../types/i18n'

const I18nContextProvider = createContext<I18nContext | null>(null)

export const useI18nContext = () => {
  const context = useContext(I18nContextProvider)
  if (!context) {
    throw new Error('useI18nContext must be used within I18nProvider')
  }
  return context
}

interface I18nProviderProps {
  children: React.ReactNode
  initialLanguage?: Language
  language?: Language // 受控语言切换
}

export const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  initialLanguage = 'zh',
  language
}) => {
  const i18n = useI18n(initialLanguage)

  // 当外部language属性变化时，同步内部状态
  useEffect(() => {
    if (language && language !== i18n.language) {
      i18n.setLanguage(language)
    }
  }, [language, i18n])

  return (
    <I18nContextProvider.Provider value={i18n}>
      {children}
    </I18nContextProvider.Provider>
  )
}