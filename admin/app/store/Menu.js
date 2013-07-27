Ext.define('Blog.store.Menu', {
	
	extend: 'Ext.data.TreeStore',

	model: 'Blog.model.Menu',

	storeId: 'menuStore',

	autoLoad: false,
	
	/*root: {
		expanded: true,
		text: '功能树',
		children: [
			{text: '博文管理', expanded: true, children: [
				{text: '博文管理', id: 'Article', leaf: true}
			]},
			{text: '分类管理', expanded: true, children: [
				{text: '分类管理', id: 'ArticleCategory', leaf: true}
			]}
		]
	},*/

	proxy: {
		type: 'ajax',
		url: '/admin/menu/read',
		reader: {
			type: 'json'
		}
	}
});