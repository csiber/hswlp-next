import { locales, defaultLocale } from './next-intl.config';
export { locales, defaultLocale } from './next-intl.config';
export type Locale = (typeof locales)[number];

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  hu: () => import('./lang/hu.json').then((mod) => mod.default),
  en: () => import('./lang/en.json').then((mod) => mod.default),
};

export async function getMessages(locale: Locale) {
  return dictionaries[locale]();
}
