import React from 'react';
import ReactDOM from 'react-dom/client';

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

import reportWebVitals from './reportWebVitals';
import App from './containers';

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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App messages={messages} />,
    </Provider>,
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
