/* eslint-disable prefer-template */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();

const fileExtensions = ['.jpg', '.jpeg', '.png', '.gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

const config = {
  mode: process.env.NODE_ENV || 'development',
  devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-source-map' : false,
  entry: {
    history: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: fileExtensions.concat(['.jsx', '.js', '.css']),
  },
  performance: {
    hints: process.env.NODE_ENV === 'development' ? 'warning' : false,
  },
  plugins: [
    // clean build folder
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: !process.env.NODE_ENV === 'development',
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    // generate the html file where we serve our webpack bundle
    new HtmlWebpackPlugin({
      meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      filename: 'history.html',
      template: path.join(__dirname, 'src', 'templates', 'history.html'),
    }),
    // copy manifest, icons, and content + background scripts to the build the folder
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        transform: (content) => Buffer.from(JSON.stringify({
          description: process.env.npm_package_description,
          version: process.env.npm_package_version,
          ...JSON.parse(content.toString()),
        })),
      },
      {
        from: 'src/icons',
        to: 'icons',
      },
      {
        from: 'src/timeTrack.js',
        to: "timeTrack.js"
      },
      {
        from: 'src/background.js',
        to: "background.js"
      },
    ]),
    new MomentLocalesPlugin({
      localesToKeep: ['es-us', 'en'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader?name=[name].[ext]',
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
