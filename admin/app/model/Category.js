Ext.define('Blog.model.Category', {

	extend: 'Ext.data.Model',
	
	fields: ['_id', 'p_id','cat_name', 'article_count', 'sort_order', 
	{name: 'create_date', convert: function(v, record){
			return Ext.Date.format(new Date(v), 'Y-m-d H:i:s');
	}}, 
	{name:'children', defaultValue:[], persist: false}, 
	{name: 'leaf', defaultValue: false, persist: false},
	{name: 'icon', defaultValue: 'extjs/resources/images/cat.png', persist: false}
	],

	idProperty: '_id',
	
	hasMany: { model: 'Article', name: 'articles' }
	
});