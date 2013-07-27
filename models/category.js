var conf = require('../configs/config');
var util = require('util');
var ObjectId = require('mongodb').ObjectID;
var baseModel = require('./base');
var helper = require('../helpers/common');

var catModel = function(){
	catModel.super_.apply(this, arguments);
}

util.inherits(catModel, baseModel);

catModel.prototype.getTree = function(pId, callback){
	var me = this;
	me.mongoclient.db(conf.dbName).eval('getCatTree("'+pId+'")', function(err, data){
		if(err){
			callback(err);
		}else{
			callback(null, data);
		}
	});
}

module.exports = new catModel();