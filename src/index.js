/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import App from './App';

// tell webpack to accept the updated module
if (module.hot) {
  module.hot.accept();
}

// const kMillisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
// const kOneWeekAgo = new Date().getTime() - kMillisecondsPerWeek;

// console.log(chrome.history.search({
//   text: 'webpack',
//   startTime: kOneWeekAgo,
//   maxResults: 99,
// }, (items) => console.log("items", items)));

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
