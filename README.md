# BrowserTime
:hourglass_flowing_sand: It's like screen time for your browser

Available on the Chrome Web Store - https://chrome.google.com/webstore/detail/browsertime/gaafojlhhgdkcjiglocphepomogeagie/

## Description
The default history page in chrome is :shit:

BrowserTime is an open source chrome extension that aims to make it better.

 What you get

 - :mag_right: improved searching, filtering, and management of your history
 - :bar_chart: a sleak dashboard giving your a weekly breakdown of how you spent your time on the web
 - :art: 7 awesome UI themes
## Getting started
1. git clone https://github.com/seanmiller802/browsertime
2. yarn install
3. add .env file in root with NODE_ENV=development and PORT=9090
4. yarn start:dev

should open a new tab at localhost:9090/history.html

## Production
1. yarn build
2. go to chrome://extensions/
3. toggle Developer mode
4. click load unpacked
5. select src/build folder
6. visit chrome://history

http://browsertime.us/
