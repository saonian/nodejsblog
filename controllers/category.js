var catModel = require('../models/category');
var helper = require('../helpers/common');
var EventProxy = require('eventproxy');

exports.getAllCat = function(req, res){
	catModel.getAll('category', {}, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			res.json(data);
		}
	});
}

exports.read = function(req, res){
	catModel.getTree('', function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			res.json(data);
		}
	});
}

exports.create = function(req, res){
	if(req.body.cat_name){
		req.body = [req.body];
	}

	var ep = new EventProxy();
	ep.after('add', req.body.length, function(data){
		res.json({success: true});
	});

	var create_date = new Date().getTime();
	for(var i=0,size=req.body.length;i<size;i++){
		(function(i){
			var p_id = req.body[i].p_id;
			var cat = {
				cat_name: req.body[i].cat_name,
				article_count: 0,
				sort_order: req.body[i].sort_order,
				create_date: create_date,
				parent: p_id,
				children: []
			}

			catModel.create('category', cat, function(err, data){
				if(err){
					res.json(500, {success: false});
				}else{
					ep.emit('add', data);
				}
			});
		})(i);
	}
}

exports.update = function(req, res){
	if(req.body._id){
		req.body = [req.body];
	}

	var ep = new EventProxy();
	ep.after('update', req.body.length, function(data){
		res.json({success: true});
	});

	for(var i=0,size=req.body.length;i<size;i++){
		(function(i){
			var cat = {
				cat_name: req.body[i].cat_name,
				article_count: req.body[i].article_count,
				sort_order: req.body[i].sort_order
			}
			
			catModel.update('category', req.body[i]._id, cat, function(err, data){
				if(err){
					res.json(500, {success: false});
				}else{
					ep.emit('update', data);
				}
			});
		})(i);
	}

}

exports.destroy = function(req, res){
	if(req.body._id){
		req.body = [req.body];
	}

	var ep = new EventProxy();
	ep.after('destroy', req.body.length, function(data){
		res.json({success: true});
	});

	for(var i=0,size=req.body.length;i<size;i++){
		(function(i){
			catModel.destroy('category', {"parent": req.body[i]._id}, function(err, data){
				if(err){
					res.json(500, {success: false});
				}else{
					catModel.destroy('category', req.body[i]._id, function(err, data){
						if(err){
							res.json(500, {success: false});
						}else{
							ep.emit('destroy', data);
						}
					});
				}
			});
		})(i);
	}
}