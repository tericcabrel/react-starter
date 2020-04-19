import React, { Context } from 'react';

export type LocaleItem = {
  [key: string]: string
};

export type Locales = {
  [key: string]: LocaleItem
};

export type LocaleContextType = {
  locales: LocaleItem,
  locale: string,
  changeLocale: (locale: string) => void
};

export const availableLocales: Locales = {
  en: { en: 'english', fr: 'french', de: 'german', es: 'spanish' },
  fr: { fr: 'french', en: 'english', de: 'german', es: 'spanish' },
  de: { de: 'german', fr: 'french', en: 'english', es: 'spanish' },
  es: { es: 'spanish', fr: 'french', en: 'english', de: 'german' },
};

const defaultValue: LocaleContextType = {
  locales: availableLocales.en,
  locale: 'en',
  changeLocale: (locale: string): void => {},
};

const context: Context<LocaleContextType> = React.createContext(defaultValue);

export default context;
