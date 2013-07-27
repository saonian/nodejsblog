var crypto = require('crypto');
var baseModel = require('../models/base').instance;

exports.checkLogin = function(req, res, next){
	if(!req.session.user){
		var reqBy =req.header('Request-By')
		if(!reqBy || reqBy !== 'Ext'){
			res.json({"success": "false", "msg": "非法请求"});
		}else{
			res.header('session_status', 'timeout');
			res.json({"success": "false", "msg": "登陆超时，请重新登陆"});
		}
	}else{
		next();
	}
}
exports.login = function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	var password = crypto.createHash('md5').update(password).digest('hex');
	password = password.substr(0, 20);
	password = crypto.createHash('md5').update(password).digest('hex');

	baseModel.getOne('user', {"username": username, "password": password}, function(err, data){
		if(err || data.length<1){
			res.json({"success": false, "msg": "用户名密码不匹配"});
		}else{
			req.session.user = data;
			res.json({"success": true});
		}
	});
}