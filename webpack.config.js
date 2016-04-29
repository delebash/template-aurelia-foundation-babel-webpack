var path = require('path');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');

module.exports = {
  entry: {
    main: [
      './src/main'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  // Adding jquery here makes it global for the app, no import needed
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.jQuery': 'jquery'
    }),
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new AureliaWebpackPlugin(),
    // new ProvidePlugin({
    //   Promise: 'bluebird'
    // })
  ],
  // for dev server make sure in package.json dev script that --devtool source-map not eval production version has
  //correct setting for source-map
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
    port: 3000
  },
  module: {
    resolve: {
      modulesDirectories: ['node_modules']
    },
    loaders: [

      //Use <link rel="stylesheet" href="styles.css"> in index.html when extracting css
      // Extract CSS during build
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      //You still need css for files that are not .scss but jus .css
    //  { test: /\.css?$/, loader: 'style!css' },
      {
        loader: "babel-loader",
        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "src"),
        ],
        // Only run `.js` files through Babel
        test: /\.js?$/,
        // Options to configure babel with
        query: {
      presets: ['es2015-loose', 'stage-1'], plugins: ['transform-decorators-legacy']
        }
      },
      { test: /\.html$/, loader: 'html' },
      { test: /\.(png|gif|jpg)$/, loader: 'url', query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
      { test: /\.scss$/, loader: 'style!css?sourceMap!postcss!sass?sourceMap'}
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
  // sassLoader: {
  //   includePaths: [path.resolve(__dirname, "sass")]
  // }
};
