/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    })
  ],
});
