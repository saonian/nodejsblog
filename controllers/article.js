var artModel = require('../models/article');
var helper = require('../helpers/common');

exports.read = function(req, res){
	var page = helper.isInt(req.query.page)?parseInt(req.query.page):1;
	var pagesize = helper.isInt(req.query.limit)?parseInt(req.query.limit):10;
	artModel.getArticlePage({}, page, pagesize, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			res.json(data);
		}
	});
}

exports.create = function(req, res){
	var create_date = Date.parse(req.body.create_date);
	//TODO tag还未处理
	var article = {
		title: req.body.title,
		cat_id: req.body.cat_id,
		author_id: req.session.user._id,
		content: req.body.content,
		keywords: req.body.keywords,
		description: req.body.description,
		view_count: req.body.view_count,
		like_count: req.body.like_count,
		create_date: create_date
	}

	artModel.create('article', article, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			artModel.update('category', '$inc', article.cat_id, {"article_count": 1}, function(err, data){
				res.json({success: true});
			});
		}
	});
}

exports.update = function(req, res){
	var create_date = Date.parse(req.body.create_date);
	var article = {
		title: req.body.title,
		cat_id: req.body.cat_id,
		content: req.body.content,
		keywords: req.body.keywords,
		description: req.body.description,
		view_count: req.body.view_count,
		like_count: req.body.like_count
	}
	artModel.update('article', req.body._id, article, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			res.json({success: true});
		}
	});
}

exports.destroy = function(req, res){
	artModel.destroy('article', req.body._id, function(err, data){
		if(err){
			res.json(500, {success: false});
		}else{
			artModel.update('category', '$inc', req.body.cat_id, {"article_count": -1}, function(err, data){
				res.json({success: true});
			});
		}
	});
}