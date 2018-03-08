/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('styles/[name].min.css');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    restaurant: path.resolve(__dirname, 'src/restaurant_info.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js'
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
      use: extractSASS.extract(['css-loader', 'sass-loader']),
    },{
      loader: 'sass-loader',
      options: {
        importer: function(url, prev) {
          if(url.indexOf('@material') === 0) {
            var filePath = url.split('@material')[1];
            var nodeModulePath = `./node_modules/@material/${filePath}`;
            return { file: require('path').resolve(nodeModulePath) };
          }
          return { file: url };
        }
      }
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
    }, {
      test: /\.(njk|nunjucks)$/,
      loader: 'nunjucks-loader',
      query: {
          root: __dirname + '/assets/templates'
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
        from: './src/assets/img',
        to: 'assets/img'
      },
      {
        from: './src/assets/data',
        to: 'assets/data'
      },
      {
        from: './src/**/*.njk',
        to: 'assets/templates',
        flatten: true
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
