// locals.ts
export const locales: string[] = ['cs', 'en']

export type Locale = (typeof locales)[number]

export const localesData = {
  en: {
    value: 'en',
    dir: 'ltr',
    label: 'English',
    abbreviation: 'EN',
    countryCode: 'GB',
  },
  cs: {
    value: 'cs',
    dir: 'ltr',
    label: 'Čeština',
    abbreviation: 'CS',
    countryCode: 'CZ',
  },
}
