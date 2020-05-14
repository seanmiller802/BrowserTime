/* eslint-disable no-console */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');
const config = require('./webpack.config');

// add HMR entry points
Object.keys(config.entry).forEach((entryName) => {
  config.entry[entryName] = [
    (`webpack-dev-server/client?http://localhost:${process.env.PORT}`),
    'webpack/hot/dev-server',
  ].concat(config.entry[entryName]);
});

// add dev specific plugins
config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(config.plugins || []);
config.plugins = [new WriteFilePlugin({
  test: /^(?!.*(hot)).*/, // exclude hot-update files
})].concat(config.plugins || []);

const compiler = webpack(config);

const options = {
  hot: true,
  contentBase: path.resolve(__dirname, 'build'),
  open: true,
  openPage: 'history.html',
};

const server = new WebpackDevServer(compiler, options);

server.listen(process.env.PORT);
