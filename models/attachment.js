var util = require('util');
var baseModel = require('./base');
var EventProxy = require('eventproxy');
var fs = require('fs');

var attaModel = function(){
	attaModel.super_.apply(this, arguments);
}

util.inherits(attaModel, baseModel);

attaModel.prototype.remove = function(id, filePath, callback){
	var me = this;
	me.destroy('attachment', id, function(err, numberOfRemovedDocs){
		if(err){
			callback(err);
		}else{
			if(fs.existsSync(filePath)){
				fs.unlinkSync(filePath);
			}
			callback(null, true);
		}
	});
}

module.exports = new attaModel();