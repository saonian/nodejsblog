Ext.define('Blog.view.Header', {
	
	extend: 'Ext.Component',
	
	initComponent: function(){
		var me = this;
		Ext.applyIf(me, {
			xtype: 'box',
			region: 'north',
			html: '<h1>TOANOTHER.ME</h1>',
			height: 60
		});
		me.callParent(arguments);
	}
});