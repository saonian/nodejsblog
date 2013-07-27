Ext.define('Blog.view.attachment.List', {

	extend: 'Ext.grid.Panel',

	alias: 'widget.attachmentlist',

	id: 'attachmentlist',

	title: '附件列表',

	bodyPadding: 0,

	initComponent: function(){
		var me = this, store = Ext.create('Blog.store.Attachment');

		me.store = store;

		me.columns = [
			{header: '序号',  dataIndex: '_id', width: 30},
			// {header: '标题', dataIndex: 'title', width: 300},
			{header: '文件名', dataIndex: 'file_name', width: 200},
			{header: '文件路径', dataIndex: 'file_path', width: 300},
			{header: '文件URL', dataIndex: 'file_url', width: 300},
			{header: '文件类型',  dataIndex: 'file_type', width: 70},
			{header: '文件大小',  dataIndex: 'file_size', width: 50},
			{header: '上传时间', dataIndex: 'create_date', width: 130},
			{
				header: '操作', xtype: 'actioncolumn', width: 50, align: 'center',
				items: [{
					icon: 'extjs/resources/images/page_white_delete.png',
					tooltip: '删除文件',
					handler: this.removeAtta
				},{
					icon: 'extjs/resources/images/picture.png',
					tooltip: '图片预览',
					handler: this.viewAtta
				}]
			}
		];

		me.bbar = Ext.create('Ext.toolbar.Paging', {
			//跟grid一样的数据源
			store: store,
			displayInfo: true,
			displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
			emptyMsg: "没有数据"
		});

		me.callParent(arguments);
	},

	removeAtta: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		var fileName = record.get('file_name');
		var articleGrid = Ext.getCmp('attachmentlist');
		var store = articleGrid.getStore();
		Ext.Msg.confirm("警告", "确定要删除'"+fileName+"'文件吗，删除前请确保已经没有文章引用了这个文件", function (button) {
			if(button == "yes") {
				// record.destroy();
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

	viewAtta: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
		var fileType = record.get('file_type');
		if(fileType && fileType.indexOf('image') >=0){
			var fileUrl = record.get('file_url');
			var fileName = record.get('file_name');
			var viewWindow = Ext.create('Ext.window.Window', {
				title: fileName,
				layout: 'fit',
				plain: true,
				modal: true,
				resizable: true,
				width: 600,
				height:400,
				items: [{
					xtype: 'image',
					src: fileUrl
				}]
			});
			viewWindow.show();
		}else{
			Ext.Msg.show({
				title: '提示',
				msg: '该文件不支持预览',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
		}
	}
});