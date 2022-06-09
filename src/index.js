import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { store } from './store/index';
import App from './App';
import i18n from "./lang/index.js";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n} >
      <Provider store={store}>
            <App />
       </Provider>
    </I18nextProvider>
  </React.StrictMode>
);


