Ext.define('Blog.view.Menu', {
	
	extend: 'Ext.tree.Panel',
	
	//别名，会自动定义xtype为blogMenu。可以Ext.create('widget.blogMenu')创建对象
	alias: 'widget.blogMenu',
	
	//可以页面一打开就加载Menu store，就算注释之后Ext也会自动加载
	//requires: ['Blog.store.Menu'],
	
	//store加这里和加下面没区别
	//store: Ext.create('Blog.store.Menu'),
	
	initComponent: function(){
		var me = this;
		Ext.apply(me, {
			id: 'menu',
			title: '系统菜单',
			region: 'west',
			//隐藏根目录
			rootVisible: false,
			//是否显示边框，默认true
			border: true,
			width: 200,
			minWidth: 150,
			maxWidth: 300,
			//整个panel是否默认收缩
			collapsed: false,
			//显示收缩/弹出按钮
			collapsible : true,
			split: true,
			//相当于overflow:'auto'，超出会显示滚动条
			autoScroll: true,
			containerScroll: true,
			store: Ext.create('Blog.store.Menu')
		});
		me.callParent(arguments);
	}
});