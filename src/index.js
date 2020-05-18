/* eslint-disable react/jsx-filename-extension */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// tell webpack to accept the updated module
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
