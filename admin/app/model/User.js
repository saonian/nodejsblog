Ext.define('Blog.model.User', {

	extend: 'Ext.data.Model',
	
	fields: ['id', 'username', 'nickname', 'avatar'],
	
	hasMany: { model: 'Article', name: 'articles'}
});