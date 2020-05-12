/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import App from './App';
import './css/bookmarks.css';

// tell webpack to accept the updated module
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
