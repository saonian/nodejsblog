var conf = require('../configs/config');
var helper = require('../helpers/common');
var baseModel = require('../models/base').instance;
var fs = require('fs');
var crypto = require('crypto');

exports.upload4ckeditor = function(req, res){
	//TODO 大小限制
	var funcNum = req.query.CKEditorFuncNum;
	// 获得文件的临时路径
	var tmpPath = req.files.upload.path;
	var dateFolder = helper.dateFormat(new Date(), 'yyyyMMdd');
	// 指定文件上传后的目录
	var parentDir = __dirname.substring(0, __dirname.lastIndexOf('/'));
	var targetPath = parentDir + '/uploads/';
	// 移动文件
	if(!fs.existsSync(targetPath)){
		fs.mkdirSync(targetPath, 0755);
	}
	if(!fs.existsSync(targetPath + dateFolder + '/')){
		fs.mkdirSync(targetPath + dateFolder + '/', 0755);
	}
	var fileName = req.files.upload.name.split('.');
	var md5 = crypto.createHash('md5');
	md5.update(fileName[0]);
	fileName = md5.digest('hex') + '.' + fileName[1];
	
	targetPath = targetPath + dateFolder + '/' + fileName;
	fs.rename(tmpPath, targetPath, function(err, stats) {
		if(err){
			res.send("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("+funcNum+", '', '上传失败');</script>");	
		}else{
			// 删除临时文件夹文件
			if(fs.existsSync(tmpPath)){
				fs.unlinkSync(tmpPath);
			}
			var fileUrl = conf.domain + '/' + dateFolder + '/' + fileName;
			var attach = {
				title: req.files.upload.name,
				file_name: fileName,
				file_path: targetPath,
				file_url: fileUrl,
				file_type: req.files.upload.type,
				file_size: req.files.upload.size,
				create_date: new Date().getTime()
			}
			baseModel.create('attachment', attach, function(err, data){
				if(err){
					res.send("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("+funcNum+", '"+fileUrl+"', '上传成功，数据库数据保存失败');</script>");
					throw err;
				}else{
					res.send("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("+funcNum+", '"+fileUrl+"', '上传成功');</script>");
				}
			});
		}
	});
}