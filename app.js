var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var MongoStore = require('connect-mongo')(express);
var conf = require('./configs/config.js');
var flash = require('connect-flash');
var helper = require('./helpers/common');
var config = require('./configs/config');

var app = express();

app.use(function(req, res, next){
	res.locals.helper = helper;
	next();
});
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(flash());
//静态文件放在logger前，不纳入log
var maxAge = ('development' == app.get('env')) ? 0: 6*60*60*1000;//6h
app.use(express.static(path.join(__dirname, 'public'), { maxAge: maxAge }));
app.use(express.static(path.join(__dirname, 'uploads'), { maxAge: maxAge }));
app.use(express.static(path.join(__dirname, 'admin'), { maxAge: maxAge }));
app.use(express.favicon('public/images/favicon.ico'));
app.use(express.logger('dev'));
//在路径的文件名后加上文件后缀
app.use(express.bodyParser({keepExtensions: true}));
//可以指定上传文件临时目录，默认/tmp
// app.use(express.bodyParser({keepExtensions: true, uploadDir: '/uploads'}));
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
	secret: conf.cookieSecret,
	key: conf.dbName,
	cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
	store: new MongoStore({
		db: conf.dbName
	})
}));
// app.use(express.csrf());
app.use(app.router);

// development
if ('development' == app.get('env')) {
	app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}
// production
if ('production' == app.get('env')) {
	app.use(express.errorHandler());
	app.use('view cache', true);
}

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
