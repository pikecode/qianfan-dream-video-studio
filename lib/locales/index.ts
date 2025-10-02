import { zh } from './zh'
import { en } from './en'
import { ja } from './ja'
import type { Language } from '../types/i18n'

export const locales = {
  zh,
  en,
  ja
} as const

export const getTranslations = (language: Language) => {
  return locales[language] || locales.zh
}

export { zh, en, ja }
export type { Language }