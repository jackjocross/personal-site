import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import personalApp from './reducers';
import App from './App.jsx';
import icons from './../assets/icomoon.woff';

let store = createStore(personalApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
