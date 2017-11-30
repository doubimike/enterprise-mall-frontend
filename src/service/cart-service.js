/*
* @Author: zhanghang
* @Date:   2017-11-28 22:24:02
* @Last Modified by:   zhanghang
* @Last Modified time: 2017-11-28 22:25:11
*/
var _mm = require('util/mm.js')

var _cart = {
    // 获取购物车数量
    getCartCount: function (resolve,reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        })
    },
    
}

module.exports = _cart;