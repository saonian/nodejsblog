Ext.define('Blog.view.Viewport', {

	extend: 'Ext.container.Viewport',
	
	//加载所需文件
	requires: ['Blog.view.Header', 'Blog.view.Menu', 'Blog.view.Main', 'Blog.view.Footer'],

	initComponent: function(){
		var me = this;

		Ext.apply(me, {
			id: 'viewport',
			//使用边界布局
			layout: 'border',
			// loadmask: loadmask,
			//实例化各个布局组件，在上面已有加载
			items: [
				Ext.create('Blog.view.Header'),
				Ext.create('Blog.view.Menu'),
				Ext.create('Blog.view.Main'),
				Ext.create('Blog.view.Footer')
			]
		});
		me.callParent(arguments);
	}
});