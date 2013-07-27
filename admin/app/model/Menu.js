Ext.define('Blog.model.Menu', {

	extend: 'Ext.data.Model',

	fields: ['_id', 'pid', {name: 'text', mapping: 'menu_name'}, 'controller', 'expanded', 
	{name: 'leaf', convert: function(v, record){
		return v==0 || v==''?false:true;
	}},
	'order',
	{name: 'icon', defaultValue: 'extjs/resources/images/def_menu.png'}
	]
});