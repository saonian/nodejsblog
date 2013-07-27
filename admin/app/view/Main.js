Ext.define('Blog.view.Main', {
	
	extend: 'Ext.tab.Panel',
	
	initComponent: function(){
		var me = this;
		Ext.apply(me, {
			id: 'mainTabPanal',
			region: 'center',
			//不显示边框
			border: false,
			//这里的默认属性是针对items而言的，在items里可以覆盖
			defaults: {
				autoScroll: true, 
				bodyPadding:10
			},
			//激活第一个tab
			activeTab: 0,
			//这里的所有items会默认加上上面defaults里的属性
			items: [{
				id: 'homePage',
				title: '首页',
				icon: 'extjs/resources/images/house.png',
				//充满整个容器
				layout: 'fit'
			}]
		});
		me.callParent(arguments);
	}
});