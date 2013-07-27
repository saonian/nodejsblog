var index = require('./controllers/index');
var menu = require('./controllers/menu');
var article = require('./controllers/article');
var category = require('./controllers/category');
var login = require('./controllers/login');
var upload = require('./controllers/upload');
var attachment = require('./controllers/attachment');

module.exports = function(app){
	/**********************前台************************/
	app.get('/', index.arcList);
	app.get(/\/topic\/([a-z0-9]{24})/, index.arcView);
	app.get(/\/(page)\/(\d+)/, index.arcList);
	app.get(/\/(cat)\/([a-z0-9]{24})(?:\/(\d+))?/, index.arcList);
	app.get(/\/(archives)\/(\d{4})\/(\d{1,2})(?:\/(\d+))?/, index.arcList);
	/**********************前台************************/

	/**********************后台************************/
	//权限判断
	app.get(/\/admin.*/, login.checkLogin);
	//后台登陆
	app.post('/admin/login', login.login);

	//目录读取
	app.get('/admin/menu/read', menu.read);

	//ckeditor文件上传
	app.post('/admin/upload4ckeditor', upload.upload4ckeditor);
	
	//文章读取
	app.get('/admin/article/read', article.read);
	//新增文章
	app.post('/admin/article/create', article.create);
	//更新文章
	app.post('/admin/article/update', article.update);
	//删除文章
	app.post('/admin/article/destroy', article.destroy);

	//所有分类
	app.get('/admin/category/getAllCat', category.getAllCat);
	//分类树读取
	app.get('/admin/category/read', category.read);
	//新增分类
	app.post('/admin/category/create', category.create);
	//更新分类
	app.post('/admin/category/update', category.update);
	//删除分类
	app.post('/admin/category/destroy', category.destroy);

	//读取附件信息
	app.get('/admin/attachment/read', attachment.read);
	//删除附件
	app.post('/admin/attachment/destroy', attachment.destroy);
	/**********************后台************************/

	// 404页面
	app.all('*', function(req, res){
		res.render('404');
	});
}