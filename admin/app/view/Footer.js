Ext.define('Blog.view.Footer', {
	
	extend: 'Ext.Component',
	
	initComponent: function(){
		var me = this;
		Ext.applyIf(me, {
			region: 'south',
			height: 20,
			// html: '<iframe src="/footer.php" name="footerframe" height="20" style="border:0 none"></iframe>'
			html: '这里待修改为node.js实现'
		});
		me.callParent(arguments);
	}

});