Ext.define('Blog.view.category.List', {

	extend: 'Ext.tree.Panel',

	alias: 'widget.catlist',

	id: 'catlist',

	useArrows: true,

	rootVisible: false,

	multiSelect: true,

	singleExpand: true,

	bodyPadding: 0,

	requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.ux.form.UX_TimePickerField',
		'Ext.ux.form.UX_DateTimePicker',
		'Ext.ux.form.UX_DateTimeField'
	],

	// store: Ext.create('Blog.store.Category'),

	initComponent: function(){
		var me = this;
		var store = Ext.create('Blog.store.Category');
		var editPlus = Ext.create('Ext.grid.plugin.CellEditing', {pluginId: 'catCellEdit'});
		Ext.apply(me, {
			store: store,
			plugins: [editPlus],
			columns: [{
				text: '序号',
				dataIndex: '_id',
				width: 30
			},{
				text: '分类名称',
				xtype: 'treecolumn',
				dataIndex: 'cat_name',
				allowBlank: false,
				blankText: '不能为空',
				width: 300,
				editor: {
					xtype: 'textfield',
					listeners: {
						'change': function(){
							Ext.getCmp('syncCatBtn').setDisabled(false);
						},
						'blur': function(selfObj, e, eOpts){
							var value = selfObj.getValue();
							if(Ext.String.trim(value) == ''){
								Ext.Msg.show({
									title: '提示',
									msg: '分类名不能为空',
									buttons: Ext.Msg.OK,
									icon: Ext.MessageBox.WARNING
								});
								selfObj.setValue('');
								Ext.getCmp('syncCatBtn').setDisabled(true);
							}
						}
					}
				}
			},{
				text: '文章数量',
				dataIndex: 'article_count',
				allowBlank: false,
				width: 60,
				editor: {
					xtype: 'numberfield',
					minValue: 0,
					listeners: {
						'change': function(){
							Ext.getCmp('syncCatBtn').setDisabled(false);
						}
					}
				}
			},{
				text: '排序',
				dataIndex: 'sort_order',
				allowBlank: false,
				width: 50,
				editor: {
					xtype: 'numberfield',
					minValue: 0,
					listeners: {
						'change': function(){
							Ext.getCmp('syncCatBtn').setDisabled(false);
						}
					}
				}
			},{
				text: '创建日期',
				dataIndex: 'create_date',
				allowBlank: false,
				width: 130,
				/*editor: {
					xtype: 'datetimefield',
					format: 'Y-m-d',
					listeners: {
						'change': function(){
							Ext.getCmp('syncCatBtn').setDisabled(false);
						}
					}
				}*/
			}, {
				text: '操作',
				width: 60,
				menuDisabled: true,
				xtype: 'actioncolumn',
				align: 'center',
				items: [{
					icon: 'extjs/resources/images/page_white_edit.png',
					tooltip: '编辑分类',
					handler: this.editCat
				}, {
					icon: 'extjs/resources/images/page_white_delete.png',
					tooltip: '删除分类',
					handler: this.removeCat
				}, {
					icon: 'extjs/resources/images/page_white_add.png',
					tooltip: '添加子分类',
					handler: this.addSubCat
				}],
			}],
			tbar: [{
				text: '新增顶分类',
				icon: 'extjs/resources/images/add.png',
				xtype: 'button',
				action: 'addTopCat',
				scope: this
			},{
				text: '同步数据',
				icon: 'extjs/resources/images/refresh.png',
				id: 'syncCatBtn',
				xtype: 'button',
				disabled: true,
				action: 'syncData',
				scope: this
			}]
			//treegrid还不能支持分页
			/*,
			bbar: [{
				xtype: 'pagingtoolbar',
				store: store,
				displayInfo: true,
				displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
				emptyMsg: "没有数据"
			}]*/
		});
		me.callParent(arguments);
	},

	editCat: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		// var editor = grid.getPlugin('catCellEdit');
		var editor = this.up('treepanel').getPlugin('catCellEdit');
		// colIndex = colIndex-1;
		// for(colIndex;colIndex>0;colIndex--){
			editor.startEdit(rowIndex, 1);
			/*editor.startEditByPosition({
				row: rowIndex,
				column: colIndex
			});*/
		// }
	},

	removeCat: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		var catName = record.get('cat_name');
		Ext.Msg.confirm("警告", "确定要删除'"+catName+"'分类吗，分类下面的子分类也将被删除", function (button) {
			if(button == "yes") {
				record.remove();
				Ext.getCmp('syncCatBtn').setDisabled(false);
			}
		});
	},

	addSubCat: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
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
		var editor = this.up('treepanel').getPlugin('catCellEdit');
		record.expand();
		var index = record.indexOf(chileNode);
		index = rowIndex + index + 1;
		editor.startEdit(chileNode, 1);
	}

});