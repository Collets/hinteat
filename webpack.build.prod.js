/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var merge = require('webpack-merge');
var common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }, {
      copyUnmodified: true
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      uglifyOptions:{
        compress: true,
        output: {
          comments: true,
          beautify: true
        },
        keep_classnames: true,
        keep_fnames: true,
        ie8: false,
        nameCache: null, 
        safari10: false,
        toplevel: false,
        warnings: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    })
  ]
});