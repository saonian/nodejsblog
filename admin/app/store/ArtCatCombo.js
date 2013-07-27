Ext.define('Blog.store.ArtCatCombo', {

	extend: 'Ext.data.Store',
	
	storeId: 'ArtCatComboStore',
	
	autoLoad: true,
	
	idProperty: '_id',
	
	fields: [
		{name: '_id', type: Ext.data.Types.STRING},
		/*{name: 'pid', type: Ext.data.Types.INT},*/
		{name: 'cat_name', type: Ext.data.Types.STRING}
	],
	
	proxy: {
		type: 'ajax',
		url: '/admin/category/getAllCat',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});