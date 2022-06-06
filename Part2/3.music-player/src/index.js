import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import musicPlayerReducer from './store/musicPlayerReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(musicPlayerReducer, composeWithDevTools());
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
