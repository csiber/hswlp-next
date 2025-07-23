import { getMessages, Locale, defaultLocale } from '@/i18n'

export type Messages = Record<string, unknown>

export function createTranslator(messages: Messages) {
  return (key: string, params: Record<string, string | number> = {}): string => {
    const value = key.split('.').reduce((acc: unknown, part: string) => (acc as Record<string, unknown>)?.[part], messages) as string | undefined
    if (!value) return key
    let result = value
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(new RegExp(`{${k}}`, 'g'), String(v))
    }
    return result
  }
}

export async function getTranslator(locale: Locale = defaultLocale) {
  const messages = await getMessages(locale)
  return createTranslator(messages)
}
