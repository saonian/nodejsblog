Ext.define('Blog.controller.Article', {
	extend: 'Ext.app.Controller',

	requires: ['Ext.ux.form.UX_TimePickerField','Ext.ux.form.UX_DateTimePicker','Ext.ux.form.UX_DateTimeField'],
	
	init: function() {
		this.control({
			'articlelist': {
				//选中一行的时候显示删除按钮
				'select': this.showDelBtn,
				//双击一行的时候打开编辑窗口
				'itemdblclick': this.showEditWindow,
			},
			'articlelist > toolbar > button[action=add]': {
				//单击添加按钮事件
				'click': this.showAddWindow
			},
			'articlelist > toolbar > button[action=remove]': {
				//单击删除按钮事件
				'click': this.removeArticle
			},
			'articleadd toolbar > button[action=save]': {
				'click': this.addArticle
			},
			'articleadd toolbar > button[action=reset]': {
				'click': this.addFormReset
			},
			'articleedit toolbar > button[action=update]': {
				'click': this.editArticle
			},
			'articleedit toolbar > button[action=save]': {
				'click': this.editFormReset
			}
		});
	},
	//这里只是指定了视图并加载，并没有创建
	views: ['article.List','article.Edit','article.Add'],
	//这里只是指定了存储器并加载，并没有创建
	stores: ['Article'],
	//这里只是指定了模型并加载，并没有创建
	models: ['Article'],

	loadModel: function(){
		// this.getModel('Article').create();
	},

	loadView: function(){
		//只有视图创建之后，才能通过Ext.getCmp(xtype/id)取到组件对象
		// this.getView('article.Add').create();
		// this.getView('article.Edit').create();
	},

	showDelBtn: function(selView, record, index, eOpts){
		var removeBtn = Ext.getCmp('articlelist').down('toolbar > button[action=remove]');
		removeBtn.enable(false)
	},

	showAddWindow: function(selView, record, selHtmlElm, index, e, eOpts){
		//只允许打开一个添加窗口
		if(Ext.getCmp('articleadd')){
			return;
		}
		var addWindow = Ext.widget('articleadd');
		addWindow.show();
	},

	showEditWindow: function(selView, record, selHtmlElm, index, e, eOpts){
		if(Ext.getCmp('articleedit')){
			return;
		}
		var editWindow = Ext.widget('articleedit');
		editWindow.down('form combobox[name=cat_id]').setValue(record.get('cat_id'));
		editWindow.down('form datetimefield').setValue(record.get('create_date'));
		editWindow.down('form').loadRecord(record);
		editWindow.show();
		//必须在ckeditor渲染之后设置值才能正确显示出来，所以必须放在show方法后面
		editWindow.down('form ckeditor').setValue(record.get('content'));
	},

	addArticle: function(selView, record, index, eOpts){
		var addWindow = Ext.getCmp('articleadd');
		addWindow.down('form').submit({
			waitMsg: '正在添加...',
			waitTitle: '新增文章',
			url: '/admin/article/create',
			method: 'POST',
			success: function (form, action) {
				Ext.MessageBox.show({
					title: '提示',
					msg: '添加成功',
					icon: Ext.MessageBox.INFO,
					buttons: Ext.Msg.OK
				});
				addWindow.close();
				//添加成功后grid重新读取数据
				Ext.getStore('articleStore').reload();
			},
			failure: function (form, action) {
				Ext.MessageBox.show({
					title: '提示',
					msg: '添加失败，请重试',
					icon: Ext.MessageBox.ERROR,
					buttons: Ext.Msg.OK
				});
			}
		});
	},

	editArticle: function(selView, record, index, eOpts){
		var editWindow = Ext.getCmp('articleedit');
		editWindow.down('form').submit({
			waitMsg: '正在更新...',
			waitTitle: '更新文章',
			url: '/admin/article/update',
			method: 'POST',
			success: function (form, action) {
				Ext.Msg.show({
					title: '提示',
					msg: '更新成功',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.INFO
				});
				editWindow.close();
				//更新成功后grid重新读取数据
				Ext.getStore('articleStore').reload();
			},
			failure: function (form, action) {
				Ext.Msg.show({
					title: '错误',
					msg: action.result ? action.result.msg : '更新失败，请重试',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.ERROR
				});
			}
		});
	},

	removeArticle: function(selView, record, index, eOpts){
		//这里的参数record不是grid的record
		var articleGrid = Ext.getCmp('articlelist');
		var store = articleGrid.getStore();
		//选中的数据
		var record = articleGrid.getSelectionModel().getSelection()[0];
		Ext.Msg.confirm("警告", "确定要删除吗？", function (button) {
			if(button == "yes") {
				store.remove(record);
				store.sync({
					success: function(){
						Ext.Msg.show({
							title: '提示',
							msg: '删除成功',
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.INFO
						});
					},
					failure: function(){
						Ext.Msg.show({
							title: '错误',
							msg: '删除失败，请重试',
							buttons: Ext.Msg.OK,
							icon: Ext.MessageBox.ERROR
						});
					}
				});
			}
		});
	},

	addFormReset: function () {
		var addWindow = Ext.getCmp('articleadd');
		addWindow.down('form').getForm().reset();
	},

	editFormReset: function () {
		var addWindow = Ext.getCmp('articleedit');
		addWindow.down('form').getForm().reset();
	}
});