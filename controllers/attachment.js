var attaModel = require('../models/attachment');

exports.read = function(req, res){
	attaModel.getAll('attachment', {}, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			res.json(data);
		}
	});
}

exports.destroy = function(req, res){
	attaModel.remove(req.body._id, req.body.file_path, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			res.json({success: true});
		}
	});
}