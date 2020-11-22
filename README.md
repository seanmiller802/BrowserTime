# BrowserTime
It's like screen time for your browser

Available on the Chrome Web Store - https://chrome.google.com/webstore/detail/browsertime/gaafojlhhgdkcjiglocphepomogeagie/

## Description
BrowserTime is an open source chrome extension for your browser history.

 What you get

 - improved searching, filtering, and management of your history
 - a weekly report of how you spent your time on the web
 - 7 awesome UI themes
## Getting started
1. git clone https://github.com/seanmiller802/browsertime
2. yarn install
3. add .env file in root with NODE_ENV=development and PORT=9090
4. yarn start:dev

should open a new tab at localhost:9090/history.html

## Production
1. yarn build
2. chrome://extensions/
3. toggle Developer mode
4. choose load unpacked
5. select build folder
6. visit chrome://bookmarks

