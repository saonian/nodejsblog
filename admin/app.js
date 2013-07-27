Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'Ext': 'extjs',
		'App': 'app',
		'Ext.ux': 'extjs/ux'
	}
});

Ext.require([
	'Ext.app.Application',
	'Ext.app.Controller'
]);

Ext.app.Controller.implement({
	loadModel: function() {},
	loadView: function() {},
	getApplication: function() {
		return this.application;
	}
});
//标识ajax请求 
Ext.Ajax.defaultHeaders = {
	'Request-By': 'Ext'
};

Ext.Ajax.on('requestcomplete', function(conn, response, opts){
	//Any upload file using hidden iframe will have the same problem, because the xmlHttpRequest does not exists. But the miniprofiler should skip the profiling and not break the Javascript Event firing Solution is check xhr.getResponseHeader before call method
	if(response.getResponseHeader && response.getResponseHeader('session_status')){
		var loginWindow = Ext.getCmp('bloglogin');
		if(!loginWindow){
			Ext.widget('bloglogin').show();
		}
	}
});

Ext.application({
	name: 'Blog',

	appFolder: 'app',
	
	//自动创建viewport，在调用launch方法之前，自动加载 app.view.Viewport
	autoCreateViewport: true,

	controllers: ['Menu'],

	requires: ['Blog.view.Login'],
	
	loadModule : function(controllers) {
		var me = this;
		var controllers = Ext.Array.from(controllers), ln = controllers.length, i, controller;
		for (i = 0; i < ln; i++) {
			var name = controllers[i];

			if (!me.controllers.containsKey(name)) {
				var controllerName = me.getModuleClassName(name, 'controller');
				var controller = Ext.create(controllerName, {
					application: me,
					id: name
				});
				me.controllers.add(controller);
				
				//优先加载模型
				controller.loadModel();
				
				controller.init(me);
				controller.onLaunch(me);
				
				//动态构建视图 &绑定模型数据
				controller.loadView();
			}
		}
	}
});