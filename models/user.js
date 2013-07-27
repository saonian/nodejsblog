var util = require('util');
var ObjectId = require('mongodb').ObjectID;
var baseModel = require('./base');
var EventProxy = require('eventproxy');

var userModel = function(){
	userModel.super_.apply(this, arguments);
}

util.inherits(userModel, baseModel);

module.exports = new userModel();