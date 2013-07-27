Ext.define('Blog.store.Category', {

	extend: 'Ext.data.TreeStore',

	model: 'Blog.model.Category',

	storeId: 'catStore',

	autoLoad: true,
	//关闭自动同步，类别都添加好后通过点击按钮手工同步所有数据
	autoSync: false,

	proxy: {
		type: 'ajax',
		api: {
			read: '/admin/category/read',
			create: '/admin/category/create',
			update: '/admin/category/update',
			destroy: '/admin/category/destroy'
		},
		reader: {
			type: 'json',
		},
		writer: {
			type: 'json',
			writeAllFields: true,
		},
		listeners: {
			exception: function(proxy, response, operation){
				Ext.MessageBox.show({
					title: '服务端异常',
					msg: operation.getError(),
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		}
	}
});