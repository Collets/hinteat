/* eslint-disable */

var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('styles/[name].min.css');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].min.js'
  },
  resolve:{
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [{
      test: /(\.js)$/,
      use: {
        loader: 'babel-loader',
        options: {
          retainLines: true,
          presets: ['env']
        }
      },
      exclude: /node_modules/,
      include: '/src/'
    }, {
      test: /(\.scss|\.sass)$/,
      use: extractSASS.extract([
        {
          loader: 'css-loader'
        }, 
        { 
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
        }
      ]),
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
    },{ 
      test: /\.woff2$/, 
      loader: 'file-loader?limit=65000&mimetype=application/font-woff2&name=src/assets/fonts/[name].[ext]' 
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
        from: './manifest.json',
        to: './'
      }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      names: 'vendor',
      minChunks: 3
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
    new webpack.DefinePlugin({
      'process.env': {
        'BASEURL': JSON.stringify(process.env.BASEURL),
        'MAPSAPIKEY': JSON.stringify(process.env.MAPSAPIKEY),
        'APIBASEURL': JSON.stringify(process.env.APIBASEURL),
        'VERSION': JSON.stringify(require('./package.json').version),
      }
    }),
    new InjectManifest({
      swSrc: './src/sw.js'
    }),
  ]
};
