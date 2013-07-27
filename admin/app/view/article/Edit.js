Ext.define('Blog.view.article.Edit', {
	
	extend: 'Ext.window.Window',
	
	alias: 'widget.articleedit',

	id: 'articleedit',
	
	title: '编辑文章',

	maximizable: true,
	
	icon: 'extjs/resources/images/page_white_edit.png',

	requires: ['Blog.store.ArtCatCombo', 'Ext.ux.form.CkEditor'],

	initComponent: function(){
		var me = this;
		var catStore = Ext.create('Blog.store.ArtCatCombo');
		Ext.applyIf(me, {
			title: '编辑文章',
			layout: 'fit',
			plain: true,
			modal: true,
			height: 650,
			width: 800,
			items: [{
				xtype: 'form',
				bodyPadding: 10,
				border: false,
				items:[{
					xtype: 'hidden',
					name: '_id'
				}, {
					xtype: 'textfield',
					fieldLabel: '文章标题',
					labelAlign: 'left',
					name: 'title',
					allowBlank: false,
					blankText: '文章标题不能为空',
					anchor: '70%'
				}, {
					xtype: 'combobox',
					fieldLabel: '文章分类',
					emptyText: '请选择分类',
					labelAlign: 'left',
					editable: false,
					name: 'cat_id',
					displayField: 'cat_name',
					valueField: '_id',
					store: catStore,
					allowBlank: false,
					blankText: '文章分类不能为空',
				}, {
					xtype: 'textfield',
					fieldLabel: '关键字',
					labelAlign: 'left',
					name: 'keywords',
					allowBlank: false,
					blankText: '关键字不能为空',
					anchor: '70%'
				}, {
					xtype: 'textfield',
					fieldLabel: '标签',
					labelAlign: 'left',
					name: 'tags',
					anchor: '70%'
				}, {
					xtype: 'textarea',
					fieldLabel: '摘要',
					labelAlign: 'left',
					name: 'description',
					allowBlank: false,
					blankText: '描述不能为空',
					rows: 3,
					anchor: '70%'
				}, {
					xtype: 'ckeditor',
					fieldLabel: '文章内容',
					labelAlign: 'left',
					anchor: '99%',
					name: 'content',
					allowBlank: true,
					CKConfig: {
						height: 100,
						//这里必须设置一个较大的值，避免选择字体等的弹出窗口被当前window挡住
						baseFloatZIndex: 99999,
						//图片和flash都上传到这里
						filebrowserUploadUrl: '/admin/upload4ckeditor'
					}
				}, {
					xtype: 'numberfield',
					fieldLabel: '浏览次数',
					labelAlign: 'left',
					name: 'view_count',
					allowBlank: false,
					blankText: '不能为空'
				}, {
					xtype: 'numberfield',
					fieldLabel: '喜欢次数',
					labelAlign: 'left',
					name: 'like_count',
					allowBlank: false,
					blankText: '不能为空'
				}, {
					xtype: 'datetimefield',
					fieldLabel: '创建时间',
					labelAlign: 'left',
					name: 'create_date',
					format: 'Y-m-d',
					value: new Date(),
					allowBlank: false,
					blankText: '不能为空',
					disabled: true
				}],
				dockedItems: [{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					layout: { pack: 'end' },
					items: [
						{ text: '更新', action: 'update', width: 80, disabled: true, formBind: true, scope: me },
						{ text: '重置', action: 'reset', width: 80, scope: me }
					],
					scope: me
				}]
			}]
		});
		me.callParent(arguments);
	}

});