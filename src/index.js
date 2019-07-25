import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import 'sanitize.css/sanitize.css';

import translationMessages from './i18n/en-gb.json';
import theme from './theme.json';
import App from './App';

const rootElement = document.getElementById('root');

const render = messages => {
  ReactDOM.render(
    <IntlProvider locale="en-gb" messages={messages}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </IntlProvider>,
    rootElement,
  );
};

if (module.hot) {
  // Hot reload React components and translation json files
  module.hot.accept(['./i18n/en-gb.json', './App'], () => {
    ReactDOM.unmountComponentAtNode(rootElement);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([import('intl/locale-data/jsonp/en.js'), import('intl/locale-data/jsonp/de.js')]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}
