/*
* @Author: zhanghang
* @Date:   2017-11-28 22:13:34
* @Last Modified by:   zhanghang
* @Last Modified time: 2017-11-28 22:22:19
*/

var _mm = require('util/mm.js')

var _user = {
    logout: function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout/do'),
            method: 'post',
            success: resolve,
            error: reject
        })
    },
    // 检查登录状态
    checkLogin: function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info/do'),
            method: 'post',
            success: resolve,
            error: reject
        })
    },
}

module.exports = _user;