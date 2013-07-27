Ext.define('Blog.store.Article', {
	
	extend: 'Ext.data.Store',
	
	model: 'Blog.model.Article',
	
	storeId: 'articleStore',

	autoLoad: true,

	autoSync: false,
	
	pageSize: 22,
	
	//如果要用record.destroy写法，则需要在model里面定义proxy
	//不在model里定义Proxy的原因是model可以被不同的store共享，而store需要其他的Proxy的时候
	//或者Model，store各自定义一个不同的proxy
	proxy: {
		type: 'ajax',

		//如果API里没定义的操作就会使用url参数定义的url
		url: '/admin/article/read',

		api: {
			read: '/admin/article/read',
			create: '/admin/article/create',
			update: '/admin/article/update',
			destroy: '/admin/article/destroy'
		},

		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
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