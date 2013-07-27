var util = require('util');
var ObjectId = require('mongodb').ObjectID;
var baseModel = require('./base');
var EventProxy = require('eventproxy');

var artModel = function(){
	artModel.super_.apply(this, arguments);
}

util.inherits(artModel, baseModel);

artModel.prototype.getArticlePage = function(query, page, pageSize, callback){
	var me = this;
	me.getPage('article', query, page, pageSize, function(err, data){
		if(err){
			callback(err);
		}else if(data){
			var ep = new EventProxy();
			ep.after('category', data.length, function(data){
				me.count('article', query, function(err, count){
					if(err){
						callback(err);
					}else{
						var pageData = {};
						pageData.data = data;
						pageData.currentPage = page;
						pageData.totalPage = parseInt((count - 1) / pageSize + 1);
						callback(null, pageData);
					}
				});
			});
			for(var i=0,size=data.length;i<size;i++){
				(function(i){
					me.getDocById('category', data[i]['cat_id'], function(err, cat){
						data[i].category = cat;
						me.getDocById('user', data[i]['author_id'], function(err, author){
							data[i].author = author;
							ep.emit('category', data[i]);
						});
					});
				})(i);
			}
		}else{
			callback(null, null);
		}
	});
}

artModel.prototype.getArticleById = function(id, callback){
	var me = this;
	me.getDocById('article', id, function(err, data){
		if(err){
			callback(err);
		}else if(data){
			me.getDocById('category', data.cat_id, function(err, cat){
				data.category = cat;
				me.getDocById('user', data.author_id, function(err, author){
					data.author = author;
					callback(null, data);
				});
			});
		}else{
			callback(null, null);
		}
	});
}

artModel.prototype.archives = function(callback){
	var me = this;
	me.getCollection('article', function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.group(
				function(doc){
					var d = new Date(doc.create_date);
					var achives = d.getFullYear() + "年" + (d.getMonth()+1) + "月";
					return {"archive": achives, "year": d.getFullYear(), "month": d.getMonth() + 1};
				},
				{},
				{"total": 0},
				function(doc, prev){prev.total++;},
				function(err, data){
					if(err){
						callback(err);
					}else{
						callback(null, data);
					}
				}
			);
		}
	});
}

module.exports = new artModel();