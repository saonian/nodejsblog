Ext.define('Blog.model.Attachment', {

	extend: 'Ext.data.Model',
	
	//主键，默认也为id
	idProperty: '_id',
	
	fields: [
		{name: '_id', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'title', type: Ext.data.Types.STRING},
		{name: 'file_name', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'file_path', type: Ext.data.Types.STRING},
		{name: 'file_url', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'file_type', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'file_size', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'create_date', type: Ext.data.Types.STRING, allowBlank: false, convert: function(v, record){
				return Ext.Date.format(new Date(v), 'Y-m-d H:i:s');
		}}
	],
	
	//如果要用record.destroy写法，则需要在model里面定义proxy
	//不在model里定义Proxy的原因是model可以被不同的store共享，而store需要其他的Proxy的时候
	//或者Model，store各自定义一个不同的proxy
	proxy: {
		type: 'ajax',

		//如果API里没定义的操作就会使用url参数定义的url
		url: '/index.php/admin/admin_attachment/',

		api: {
			read: '/index.php/admin/admin_attachment/read',
			destroy: '/index.php/admin/admin_attachment/destroy'
		},

		reader: {
			type: 'json',
			root: 'data',
			successProperty: 'success',
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