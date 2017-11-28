/*
* @Author: zhanghang
* @Date:   2017-11-27 20:59:28
* @Last Modified by:   zhanghang
* @Last Modified time: 2017-11-27 22:34:16
*/
 
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var  WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

console.log(WEBPACK_ENV)


var  getHtmlConfig = function (name) {
    return {
            template: './src/view/'+name+'.html',
            filename: 'view/'+name+'.html',
            inject: true,
            hash: true,
            chunks: ['common',name]
        }
}

 var config =  {
    entry: {
        'common':['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'], 
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    },
     output: {
         path: './dist',
         publicPath:'/dist',
         filename: 'js/[name].js'
     },
     externals: {
        'jquery': 'window.jQuery'
     },
     plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
     ],
     module: {
         loaders: [
           {
             test: /\.css$/,
             loader: ExtractTextPlugin.extract( 'style-loader','css-loader') 
           },
           {
             test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
             loader: 'url-loader?limit=100&name=resource/[name].[ext]' 
           }
         ]
       }

 };

 module.exports = config;

