/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    disableHostCheck: true,
    host: 'localhost',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'BASEURL': JSON.stringify('http://localhost:9000/')
      }
    })
  ],
});
