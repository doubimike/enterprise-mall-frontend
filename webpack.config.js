/*
 * @Author: zhanghang
 * @Date:   2017-11-27 20:59:28
 * @Last Modified by:   mike.zhang
 * @Last Modified time: 2017-11-30 09:58:25
 */

var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var HtmlWebpackPlugin = require('html-webpack-plugin')

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

console.log(WEBPACK_ENV)


var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        favicon:'./favicon.ico',
        inject: true,
        hash: true,
        title: title,
        chunks: ['common', name]
    }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
        'result': ['./src/page/result/index.js'],
    },
    output: {
        path: __dirname +'/dist/',
        publicPath: WEBPACK_ENV == 'dev' ?'/dist/':'//s.happymall.com/mmall-fe/dist/',
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
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),

    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=100&name=resource/[name].[ext]'
        }, {
            test: /\.string$/,
            loader: 'html-loader'
        }]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    }

};


if (WEBPACK_ENV == 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config;