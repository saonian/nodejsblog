Ext.define('Blog.controller.Category', {

	extend: 'Ext.app.Controller',

	views: ['category.List'],

	stores: ['Category'],

	init: function() {
		this.control({
			'catlist': {
				//右键菜单
				'itemcontextmenu': this.showContextMenu
			},
			'catlist > toolbar > button[action=addTopCat]': {
				'click': this.addTopCat,
			},
			'catlist > toolbar > button[action=syncData]': {
				'click': this.syncData,
			}
		});
	},

	loadModel: function(){
		this.getModel('Category').create();
	},

	loadView: function(){
		this.getView('category.List').create();
	},

	addTopCat: function(btn, e, eOpts){
		var chileNode = {
			leaf: true,
			pid: 0,
			article_count: 0,
			sort_order: 0,
			create_date: Ext.Date.format(new Date(), 'Y-m-d H:i:s')
		};
		var chileNode = Ext.getCmp('catlist').getRootNode().insertChild(0, chileNode);
		var editor = Ext.getCmp('catlist').getPlugin('catCellEdit');
		editor.startEdit(chileNode, 1);
	},

	syncData: function(selView, record, index, eOpts){
		Ext.getStore('catStore').sync({
			success: function(batch, options){
				Ext.Msg.show({
					title: '提示',
					msg: '同步成功',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.INFO
				});
				Ext.getCmp('syncCatBtn').setDisabled(true);
				Ext.getStore('catStore').reload();
			},
			failure: function(batch, options){
				Ext.Msg.show({
					title: '错误',
					msg: '同步失败，请重试',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
		});
	},

	showContextMenu: function(treeview, record, item, rowIndex, e, eOpts) {
		//禁用浏览器右键菜单
		e.preventDefault();
		e.stopEvent();
		var myContextMenu = Ext.create('Ext.menu.Menu',{
			shadow: 'frame',
			items: [{
				text: "添加",
				icon: 'extjs/resources/images/page_white_add.png',
				scope: this,
				handler: function() {
					myContextMenu.hide();

					if(Ext.isEmpty(record.get('_id'))){
						Ext.Msg.show({
							title: '提示',
							msg: '不能添加子节点，因为分类"'+record.get('cat_name')+'"还未同步',
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.WARNING
						});
						return;
					}
					var chileNode = {
						leaf: true,
						p_id: record.get('_id'),
						article_count: 0,
						sort_order: 0,
						create_date: Ext.Date.format(new Date(), 'Y-m-d H:i:s')
					};

					var chileNode = record.appendChild(chileNode);
					var editor = Ext.getCmp('catlist').getPlugin('catCellEdit');

					record.expand();
					var index = record.indexOf(chileNode);
					index = rowIndex + index + 1;
					editor.startEdit(chileNode, 1);
				}
			},{
				text: "编辑",
				icon: 'extjs/resources/images/page_white_edit.png',
				scope: this,
				handler: function(){
					var editor = treeview.up('treepanel').getPlugin('catCellEdit');
					editor.startEdit(rowIndex, 1);
				}
			},{
				text: "删除",
				icon: 'extjs/resources/images/page_white_delete.png',
				scope: this,
				handler: function(){
					var catName = record.get('cat_name');
					Ext.Msg.confirm("警告", "确定要删除'"+catName+"'分类吗，分类下面的子分类也将被删除", function (button) {
						if(button == "yes") {
							record.remove();
							Ext.getCmp('syncCatBtn').setDisabled(false);
						}
					});
				}
			}]
		});
		myContextMenu.showAt(e.getXY());
	}

});