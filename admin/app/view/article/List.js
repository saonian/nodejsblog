Ext.define('Blog.view.article.List' ,{
	
	extend: 'Ext.grid.Panel',
	
	alias: 'widget.articlelist',

	id: 'articlelist',

	title: '文章列表',

	bodyPadding: 0,
	
	initComponent: function() {
		//grid跟pagetoolbar必须用同一个store，否则翻页的时候grid不会同步显示
		var me = this, store = Ext.create('Blog.store.Article');
		
		me.store = store;

		me.columns = [
			{header: '序号',  dataIndex: '_id', width: 30},
			{header: '标题', dataIndex: 'title', width: 300},
			{header: '分类', dataIndex: 'cat_name', width: 80},
			{header: '作者', dataIndex: 'nickname', width: 80},
			{header: '关键字', dataIndex: 'keywords', width: 400},
			{header: '浏览次数',  dataIndex: 'view_count', width: 60},
			{header: '喜欢次数',  dataIndex: 'like_count', width: 60},
			{header: '发布时间', dataIndex: 'create_date', width: 130}
		];
		
		me.dockedItems = [{
			xtype: 'toolbar',
			dock: 'top',
			items: [{
				text : '添加',
				icon: 'extjs/resources/images/add.png',
				itemId : 'addButton',
				action : 'add',
			}, '-', {
				itemId : 'removeButton',
				text : '删除',
				icon: 'extjs/resources/images/delete.png',
				disabled : true,
				action : 'remove',
			}]
		}];
		
		me.bbar = Ext.create('Ext.toolbar.Paging', {
			//跟grid一样的数据源
			store: store,
			displayInfo: true,
			displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
			emptyMsg: "没有数据"
		});
		
		me.callParent(arguments);
	},
	
	
});