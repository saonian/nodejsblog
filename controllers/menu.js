var baseModel = require('../models/base').instance;

exports.read = function(req, res){
	baseModel.getAll('menu', {}, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			res.json(data);
		}
	});
}