var conf = {
	serverHost:'',
}

var Hogan = require('hogan.js')

var _mm = {
	// 网络请求
	request:function (param	) {
		var _this = this;
		$.ajax({
			type:param.method || 'get',
			url:param.url ||'',
			dataType:param.type||'json',
			data:param.data||'',
			success:function (res) {
				if (res.status===0) {
					typeof param.success ==='function' && param.success(res.data,res.msg);
				}else if (res.status===10){
					_this.doLogin();
				}else if (res.status===1){
					typeof param.error ==='function' && param.error(res.msg);
				}
			},
			error:function (err) {
				typeof param.error ==='function' && param.error(err.statusText);
			}
		})
	},
	// 获取服务器地址，为了方便统一修改
	getServerUrl:function(path) {
		return conf.serverHost + path;	
	},
	// 获取url参数
	getUrlParam :function (name) {
		var reg = new RegExp('(^|&)'+name+'=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result? decodeURIComponent(result[2]):null	
	},
	// 统一登录处理
	doLogin:function () {
		window.location.href = './login.html?redirect='+encodeURIComponent(window.location.href);
	},
	// 渲染html模板
	renderHtml:function (htmlTemplate,data) {
		var template = Hogan.compile(htmlTemplate),result = template.render(data);
		return result;
	},

	// 成功提示
	successTips:function (msg) {
		alert(msg||'操作成功！')
	},
	errorTips:function (msg) {
		alert(msg||'哪里不对了~')
	},
	// 字段验证，支持是否为空、手机、邮箱
	validate:function (value,type) {
		var value = $.trim(value);
		// 非空
		if('require'==type){
			return !!value;
		}

		if('phone'===type){
			return /^1\d{10}$/.test(value);
		}

		if('email'===type){
			return  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value);
		}
	},
	goHome:function () {
		window.location.href = './index.html';
	}

};


module.exports = _mm;

