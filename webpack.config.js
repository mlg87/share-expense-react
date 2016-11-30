// to create bundle file: NODE_ENV=production node_modules/.bin/webpack -p
// setting the NODE_ENV to production and the -p flag apply a number of additional
// optimizations, for example removing all the debug code from the React library
'use strict'

const webpack = require('webpack');
const path = require('path');

module.exports = {
  // entry point: main js file that initializes the app
  entry: path.join(__dirname, 'src', 'app-client.js'),
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        // convert all js files to es5
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    // allows us to define the NODE_ENV variable as a global variable in the
    // bundling process as if it was defined in one of the scripts
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // removes all the duplicated files
    new webpack.optimize.DedupePlugin(),
    // helps in reducing the file size of the resulting bundle
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
