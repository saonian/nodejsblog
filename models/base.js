var conf = require('../configs/config');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

var baseModel = function(){
	this.mongoclient = new MongoClient(new Server(conf.dbHost, conf.dbPort, {native_parser: true}));
	this.mongoclient.open(function(err, mongoclient) {
		if(err){
			console.log(err);
		}else{
			console.log("mongodb connected!");
		}
	});
};

baseModel.prototype.getCollection = function(collection, callback){
	var me = this;
	me.mongoclient.db(conf.dbName).collection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			callback(null, collection);
		}
	});
};

baseModel.prototype.getDocById = function(collection, id, callback){
	var me = this;
	me.getOne(collection, {"_id": ObjectId.createFromHexString(id)}, function(err, data){
		if(err){
			callback(err);
		}else{
			callback(null, data);
		}
	});
};

baseModel.prototype.getPage = function(collection, query, page, pagesize, callback){
	var me = this;
	me.getCollection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.find(query).skip((page-1)*pagesize).limit(pagesize).toArray(function(err, data){
				if(err){
					callback(err);
				}else{
					callback(null, data);
				}
			});
		}
	});
};

baseModel.prototype.getOne = function(collection, query, callback){
	var me = this;
	me.getCollection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.findOne(query, function(err, data){
				if(err){
					callback(err);
				}else{
					callback(null, data);
				}
			});
		}
	});
};

baseModel.prototype.getAll = function(collection, query, callback){
	var me = this;
	me.getCollection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.find(query).toArray(function(err, data){
				if(err){
					callback(err);
				}else{
					callback(null, data);
				}
			});
		}
	});
};

baseModel.prototype.create = function(collection, jdata, callback){
	var me = this;
	me.getCollection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.insert(jdata, function(err, data){
				if(err){
					callback(err);
				}else{
					callback(null, data);
				}
			});
		}
	});
};

baseModel.prototype.update = function(){
	var len = arguments.length;
	if(len < 4){
		throw new Error('缺少参数');
	}
	var collection = arguments[0];
	var operator = '$set';
	var id = arguments[1];
	var jdata = arguments[2];
	var callback = arguments[3];
	if(len == 5){
		collection = arguments[0];
		operator = arguments[1];
		id = arguments[2];
		jdata = arguments[3];
		callback = arguments[4];
	}
	var me = this;
	me.getCollection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			var param = {};
			param[operator] = jdata;
			collection.update({"_id": ObjectId.createFromHexString(id)}, param, function(err, data){
				if(err){
					callback(err);
				}else{
					callback(null, data);
				}
			});
		}
	});
}

baseModel.prototype.destroy = function(){
	var len = arguments.length;
	if(len < 3){
		throw new Error('缺少参数');
	}
	var collection = arguments[0];
	var query = arguments[1];
	var callback = arguments[2];
	if(typeof query == 'string' && query.constructor == String){
		query = {"_id": ObjectId.createFromHexString(query)};
	}else if(typeof query == 'object' && query.constructor == Object){
		
	}else{
		throw new Error('错误的参数类型');
	}
	var me = this;
	me.getCollection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.remove(query, function(err, numberOfRemovedDocs){
				if(err){
					callback(err);
				}else{
					callback(null, numberOfRemovedDocs);
				}
			});
		}
	});
}

baseModel.prototype.count = function(collection, query, callback){
	var me = this;
	me.getCollection(collection, function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.count(query, function(err, data){
				if(err){
					callback(err);
				}else{
					callback(null, data);
				}
			});
		}
	});
};

baseModel.prototype.login = function(username, password, callback){
	var me = this;
	me.getCollection('user', function(err, collection){
		if(err){
			callback(err);
		}else{
			collection.find({"username": username, "password": password}).toArray(function(err, data){
				if(err){
					callback(err);
				}else{
					callback(null, data);
				}
			});
		}
	});
};

baseModel.prototype.logout = function(callback){
	
};

module.exports = baseModel;
module.exports.instance = new baseModel();