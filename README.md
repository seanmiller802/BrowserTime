# BrowserTime
It's like screen time for your browser history

## Description
The default history page in chrome is :shit:

BrowserTime is an open source chrome extension that aims to make it better.

What you get

 - :mag_right: &nbsp; improved searching, filtering, and management of your history
 - :bar_chart: &nbsp; a sleak dashboard giving you a weekly breakdown of how you spent your time on the web
 - :art: &nbsp; 7 awesome UI themes

 ![Dashboard logo](./dash.png)
 
## Download on Chrome Web Store 
 
BrowserTime is available for download on the [Chrome Web Store](https://chrome.google.com/webstore/detail/browsertime/gaafojlhhgdkcjiglocphepomogeagie/)
 
(note: the version available on the store may be behind the latest version availble on Github)
 
## Permissions
 
This extension requests the following permissions:
 
- history (Read and change your browsing history)
- top sites (Read a list of your most frequently visited websites. Will be deprecated in a future release.)
- storage (Access to the chrome.storage API. Will be deprecated in a future release.)
- unlimitedStorage (Unlimited storage for client-side data. Will be deprecated in a future release.)
- chrome://favicon/ (Access website favicons.)

## Privacy

This project is commited to preserving the privacy of its user's data. We do the following to ensure this:

- no accounts
- no tracking
- no data transfer to a server
- no cookies

If you see anything that could be a vulnerability or compromise privacy or security please submit an issue
 
## Contributing

Contributions to this project are encouraged! Feel free to make pull requests for bug fixes and new features. Before making a pull request for a new feature, please create
an issue so we can discuss

## Setup for development

Clone the repo: ```git clone https://github.com/seanmiller802/browsertime```

Install the dependencies: ``` npm run install```

### Run Development Server (currently buggy. suggested to just build for production)

Add .env file in root directory with these values: ```NODE_ENV=development PORT=9090```

Start the development server: ```npm run start:dev```

this should open a new tab at localhost:9090/history.html

### Build for Production
Run the build script: ```npm run build```

Go to chrome://extensions/ if using Chrome browser or brave://extensions if using Brave browser

Toggle Developer mode

Click the 'Load Unpacked' button

Select the build folder at BrowserTime/src/build

Visit chrome://history if using Chrome browser or brave://history if using Brave Browser

## Useful Links

Chrome Extension documentation - https://developer.chrome.com/docs/extensions/

Material-ui component library - https://material-ui.com/

Charting Libraries 
- @devexpress/dx-react-chart-material-ui
- @devexpress/dx-react-chart
