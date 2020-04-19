import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { toast } from 'react-toastify';

import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/include-aliases';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import '@formatjs/intl-relativetimeformat/dist/locale-data/de';
import '@formatjs/intl-relativetimeformat/dist/locale-data/es';
import '@formatjs/intl-relativetimeformat/dist/locale-data/fr';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

import App from './containers';
import * as serviceWorker from './serviceWorker';

import { configureStore } from './store';

import messages_en from './translations/locales/en.json';
import messages_fr from './translations/locales/fr.json';
import messages_de from './translations/locales/de.json';
import messages_es from './translations/locales/es.json';

import { LocaleMessages } from './types/common';

const messages: LocaleMessages = {
  en: messages_en,
  fr: messages_fr,
  de: messages_de,
  es: messages_es,
};

toast.configure({});

ReactDOM.render(
  <Provider store={configureStore()}>
    <App messages={messages} />,
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
