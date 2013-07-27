var arcModel = require('../models/article');
var helper = require('../helpers/common');

exports.arcList = function(req, res){
	var page = 1;
	var query = {};
	var baseUrl = '/page';

	if(req.params[0] && req.params[0] == 'page'){
		page = parseInt(req.params[1]);
	}else if(req.params[0] && req.params[0] == 'cat'){
		query = {"cat_id": req.params[1]};
		page = parseInt(req.params[2]);
		baseUrl = '/cat/' + req.params[1];
	}else if(req.params[0] && req.params[0] == 'archives'){
		var monDays = helper.getDaysOfMonth(req.params[1], req.params[2]);
		var startDate = Date.parse(req.params[1]+'/'+req.params[2]+'/01');
		var endDate = Date.parse(req.params[1]+'/'+req.params[2]+'/'+monDays);
		query = {"create_date": {"$gte": startDate, "$lte": endDate}};
		page = parseInt(req.params[3]);
		baseUrl = '/archives/' + req.params[1] + '/' + req.params[2];
	}

	arcModel.getArticlePage(query, page, 10, function(err, articles){
		if(err){
			res.send(500, '服务端错误');
		}else{
			arcModel.archives(function(err, archives){
				if(err){
					res.send(500, '服务端错误');
				}else{
					arcModel.getAll('category', {}, function(err, categories){
						if(err){
							res.send(500, '服务端错误');
						}else{
							res.render('index', {
								articles: articles.data,
								archives: archives,
								categories: categories,
								totalPage: articles.totalPage,
								currentPage: articles.currentPage,
								baseUrl: baseUrl
							});
						}
					});
				}
			});
		}
	});
}

exports.arcView = function(req, res){
	arcModel.getArticleById(req.params[0], function(err, article){
		if(err){
			res.send(500, '服务端错误');
		}else{
			arcModel.archives(function(err, archives){
				if(err){
					res.send(500, '服务端错误');
				}else{
					arcModel.getAll('category', {}, function(err, categories){
						if(err){
							res.send(500, '服务端错误');
						}else{
							res.render('article', {
								article: article,
								archives: archives,
								categories: categories,
								currentPage: false
							});
						}
					});
				}
			});
		}
	});
}