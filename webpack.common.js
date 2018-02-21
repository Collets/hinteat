var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSASS = new ExtractTextPlugin('styles/[name].min.css');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:{
        main: path.resolve(__dirname, "src/js/main.js")
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].min.js',
    },
    module:{
        rules: [{
            test: /(\.js)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["es2015"]
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
        }, {
            test: /\.(gif|jpg|png|ico)\??.*$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[ext]',
                    publicPath: '../../',
                    outputPath: 'assets/img/'
                }
            }
        }]
    },
    plugins:[
        new CleanWebpackPlugin(["dist"], {
            root: '',
            verbose: true,
            dry: false
        }),
        extractSASS,
        new webpack.optimize.CommonsChunkPlugin({
            names: "vendor",
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ]
};