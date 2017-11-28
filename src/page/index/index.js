require('../module.js')

require('./index.css')

var _mm = require('util/mm.js')

console.log('_mm',_mm)

// _mm.request({
// 	url:'/product/list.do?keyword=1',
// 	success:function (res) {
// 		console.log(res)
// 	},
// 	error:function (errMsg) {
// 		console.log(errMsg)
// 	}
// })

// console.log(_mm.getUrlParam('test'))

var html = '<div>{{data}}</div>'
var data = {
	data:123
}

console.log(_mm.renderHtml(html,data))