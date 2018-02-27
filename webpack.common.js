var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('styles/[name].min.css');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/js/main.js'),
    restaurant: path.resolve(__dirname, 'src/js/restaurant_info.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js',
    library: 'MWS',
    libraryTarget:'window'
  },
  module: {
    rules: [{
      test: /(\.js)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      exclude: /node_modules/,
      include: '/src/'
    }, {
      test: /(\.scss|\.sass)$/,
      use: extractSASS.extract(['css-loader', 'sass-loader'])
    }, {
      test: /\.html$/,
      use: {
        loader: 'html-loader',
        options: {
          minimize: true,
          removeComments: false,
          collapseWhitespace: false
        }
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: '',
      verbose: true,
      dry: false
    }),
    extractSASS,
    new CopyWebpackPlugin([{
        from: './src/img',
        to: 'assets/img'
      },
      {
        from: './src/data',
        to: 'assets/data'
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      inject: 'body',
      chunks: ['main', 'vendor'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'restaurant.html',
      template: './src/restaurant.html',
      inject: 'body',
      chunks: ['restaurant', 'vendor'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};
