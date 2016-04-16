//const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer');
const path = require('path');
const AureliaWebpackPlugin = require('aurelia-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//common is just a javascript object for variable i.e common.devtool = sourcmap
//file webpack.common.js
const common = require('./webpack.common')

module.exports = {
  entry: common.entry,
  resolve: common.resolve,
  //debug needed to generate source maps
  //See http://www.jbrantly.com/typescript-and-webpack/ for TS source maps  in chrome debuger left pane
  //Expand the webpack cloud icon then src folder and you will see your files
  debug: true,
  devtool: common.devtool,
  devServer: {
    host: 'localhost',
    port: 3000
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    sourceMapFilename: "bundle.js.map"
  },
  plugins: [
    new AureliaWebpackPlugin(),
    new ProvidePlugin({
      Promise: 'bluebird'
    }),
    //To view sourcemaps
    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin('styles.css')
  ],

//Using an ! in the loaders, just pipes the loaders insead of puting them in an array, the loaders are
//read from right to left
  module: {
    loaders: [
      //NOTE: Babel presets are in .babelrc
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/, /node_modules/] },      
     // { test: /\.js$/, loader: 'babel', include: /node_modules\/aurelia-[a-z\-]+/, query: { plugins: common.babelPlugins } },
      // { test: /\.js$/, loader: 'babel', include: /node_modules\/aurelia-[a-z\-]+/, query: { presets: ['es2015-loose-rollup'],
      // plugins: ['transform-decorators-legacy', 'transform-runtime'] } },
      // { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015-loose-rollup', 'stage-1'],
      // plugins: ['transform-decorators-legacy', 'transform-runtime'] } },
       { test: /\.html$/, loader: 'html' },
      { test: /\.(png|gif|jpg)$/, loader: 'url', query: { limit: 8192 } },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff2' } },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url', query: { limit: 10000, mimetype: 'application/font-woff' } },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' },
      { test: /\.css?$/, loader: 'style!css!postcss'},
      { test: /\.scss$/, loader: 'style!css?sourceMap!postcss!sass?sourceMap'}
    ]
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
};


// PostCCss and AutoPrefixer
// {
//   test:   /\.css$/,
//     loader: "style-loader!css-loader!postcss-loader"
// }
// ]
// },
// postcss: function () {
//   return [precss, autoprefixer];
// }



// Load SCSS  via sass-load

// you can import your Sass modules from node_modules. Just prepend them with a ~ to tell
// webpack that this is not a relative import:
// @import "~bootstrap/less/bootstrap";

//{ test: /\.scss$/, loader: 'style?sourceMap!css?sourceMap!postcss!sass'}
// sassLoader: {
//   includePaths: [path.resolve(__dirname, "./sass")]
// }

//HappyPack(Not Working) makes webpack builds faster by allowing you to transform multiple files in parallel.
