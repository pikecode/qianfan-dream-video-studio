import { zh } from './zh'
import { en } from './en'
import type { Language } from '../types/i18n'

export const locales = {
  zh,
  en
} as const

export const getTranslations = (language: Language) => {
  return locales[language] || locales.zh
}

export { zh, en }
export type { Language }