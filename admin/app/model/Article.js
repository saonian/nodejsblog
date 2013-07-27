Ext.define('Blog.model.Article', {

	extend: 'Ext.data.Model',
	
	//主键，默认也为id
	idProperty: '_id',
	
	fields: [
		{name: '_id', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'title', type: Ext.data.Types.STRING, allowBlank: false},
		//不直接在cat_id上mapping到category.cat_name
		{name: 'cat_id', type: Ext.data.Types.STRING, allowBlank: false},
		//cat_name作为显示用
		{name: 'cat_name', type: Ext.data.Types.STRING, mapping: 'category.cat_name', defaultValue: '文章分类已被删除', persist: false},
		{name: 'author_id', type: Ext.data.Types.INT, allowBlank: false},
		{name: 'nickname', type: Ext.data.Types.STRING, allowBlank: false, mapping: 'author.nickname', persist: false},
		{name: 'content', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'keywords', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'description', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'view_count', type: Ext.data.Types.INT, allowBlank: false},
		{name: 'like_count', type: Ext.data.Types.INT, allowBlank: false},
		{name: 'tags', type: Ext.data.Types.STRING, allowBlank: false},
		{name: 'create_date', type: Ext.data.Types.STRING, allowBlank: false, convert: function(v, record){
			return Ext.Date.format(new Date(v), 'Y-m-d H:i:s');
		}},
	],
	
	belongsTo: ['Blog.model.Category', 'Blog.model.User'],

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