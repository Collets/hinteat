/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    main: ['webpack-dev-server/client?http://localhost:9000', path.resolve(__dirname, 'src/main.js')],
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    disableHostCheck: true,
    host: 'localhost',
    historyApiFallback: true,
    open: true,
    hot: true,
    stats: {
      colors: true
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      }
    })
  ],
});
