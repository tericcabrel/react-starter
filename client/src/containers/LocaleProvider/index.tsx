/*
 *
 * LocaleProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React, { FC, ReactElement, useState } from 'react';
import { IntlProvider } from 'react-intl';

import LocaleContext, { availableLocales, LocaleItem } from './locale-context';
import { LocaleMessages } from '../../types/common';

interface ILocaleProviderProps {
  messages: LocaleMessages;
  children: React.ReactElement;
}

interface ILocaleProviderState {
  locales: LocaleItem;
  locale: string;
}

const LocaleProvider: FC<ILocaleProviderProps> = ({ messages, children }: ILocaleProviderProps): ReactElement => {
  const [data, setData]: [ILocaleProviderState, Function] = useState({
    locales: availableLocales.en,
    locale: 'en',
  });

  const changeLocale: (locale: string) => void = (locale: string): void => {
    setData({ locale, locales: availableLocales[locale] });
  };

  return (
    <LocaleContext.Provider value={{ changeLocale, locale: data.locale, locales: data.locales }}>
      <IntlProvider locale={data.locale} key={data.locale} messages={messages[data.locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
