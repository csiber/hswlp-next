export const locales = ['hu', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  hu: () => import('./lang/hu.json').then((mod) => mod.default),
  en: () => import('./lang/en.json').then((mod) => mod.default),
};

export async function getMessages(locale: Locale) {
  return dictionaries[locale]();
}
