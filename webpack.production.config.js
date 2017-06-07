var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var PreloadWebpackPlugin = require('preload-webpack-plugin');

const extractSCSS = new ExtractTextPlugin({filename: '[name]-[contenthash].css', allChunks: true});

loaders.push({
  test: /\.(scss|sass|css)$/,
  use: extractSCSS.extract({
		fallback: 'style-loader',
		use : [
			{
				loader: 'css-loader',
				options: {
					sourceMap: true,
					modules: true,
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

// loaders.push({
//   test: /\.sass$/,
//   loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
//   exclude: ['node_modules']
// });

module.exports = {
  entry: [
		'babel-polyfill',
    './src/index.jsx',
    './styles/index.sass'
  ],
  output: {
    publicPath: './',
    path: path.join(__dirname, 'public'),
    filename: 'app-[chunkhash].js'
  },
  resolve: {
		alias: {
      Components: path.resolve(__dirname, './src/components/components'),
      Routes: path.resolve(__dirname, './src/routes/routes.js'),
      Core: path.resolve(__dirname, './src/core'),
      // SVG: path.resolve(__dirname, './src/svg'),
    },
    extensions: ['.js', '.jsx']
  },
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
