"use strict";
require('babel-polyfill');
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var common = require('./webpack.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var PreloadWebpackPlugin = require('preload-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

loaders.push({
  test: /\.scss$/,
  loaders: [
		'style-loader',
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1,
				modules: true,
				localIdentName: '[name]__[local]___[hash:base64:5]',
			}
		},
		'postcss-loader',
		'sass-loader'
	],
  exclude: ['node_modules']
});

loaders.push({
  test: /\.sass$/,
  loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
  exclude: ['node_modules']
});

loaders.push({
	test: /\.css$/,
	loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader'],
	exclude: ['node_modules']
});

var config = {
  entry: [
		'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.jsx', // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
	resolve: common.resolve,
  module: {
    loaders
  },
  devServer: {
    contentBase: "./public",
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    port: PORT,
    host: HOST
  },
  plugins: [
		new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  	new PreloadWebpackPlugin({
			rel: 'preload',
			as: 'script',
			include: 'asyncChunks'
		}),
  ]
};

// config.resolve = common.resolve;

module.exports = config;
