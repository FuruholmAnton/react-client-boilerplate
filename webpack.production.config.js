var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var common = require('./webpack.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var PreloadWebpackPlugin = require('preload-webpack-plugin');

/* Extract SCSS/SASS/CSS to a separate file */
const extractSCSS = new ExtractTextPlugin({filename: '[name]-[contenthash].css', allChunks: true});

/* CSS modules */
loaders.push({
  test: /\.(scss|css)$/,
  use: extractSCSS.extract({
		fallback: 'style-loader',
		use : [
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true, // Adds module name to the class
					localIdentName: '[name]__[local]___[hash:base64:5]',
				}
			},
			'postcss-loader',
			{
				loader: 'sass-loader',
				options: {
					outputStyle: 'expanded',
				}
			}
		]}),
  exclude: ['node_modules']
});

/* Global styles */
loaders.push({
  test: /\.(sass)$/,
  use: extractSCSS.extract({
		fallback: 'style-loader',
		use : [
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					localIdentName: '[name]__[local]___[hash:base64:5]',
				}
			},
			'postcss-loader',
			{
				loader: 'sass-loader',
				options: {
					outputStyle: 'expanded',
				}
			}
		]}),
  exclude: ['node_modules']
});

var config = {
  entry: [
		'babel-polyfill',
    './src/index.jsx',
  ],
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: 'app-[chunkhash].js'
  },
	resolve: common.resolve,
  module: {
    loaders
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new ExtractTextPlugin({
    //   filename: [name]__[local]___[hash:base64:5],
    //   allChunks: true
    // }),
		extractSCSS,
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: ['bundle.js'],
      }
    }),
  	new PreloadWebpackPlugin({
			rel: 'preload',
			as: 'script',
			include: 'asyncChunks'
		}),
		new OfflinePlugin()
  ]
};

module.exports = config;
