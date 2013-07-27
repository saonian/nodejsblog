Ext.define('Blog.controller.Menu', {

	extend: 'Ext.app.Controller',
	
	init: function(application){
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget = 'side';
		// 给组件添加监听器，监听器使用Ext.ComponentQuery获取，可以使用#id，也可以用xtype
		this.control({
			'#menu': {
				itemclick: function(itemobj, record, item, index, e, eOpts){
					if(record.get('leaf')){
						var loadMask = Ext.create('Ext.LoadMask',{target:Ext.getCmp('mainTabPanal'), msg:"加载中，请稍后..."});
						loadMask.show();
						var id = record.get('controller');
						// 获取主tabPanel,这里的id定义在Main视图里
						var main = Ext.getCmp('mainTabPanal');
//						var tabPanel = Ext.getCmp(id);
						var tabPanel = main.getComponent(id);
						if(!tabPanel){
							application.loadModule(id);
							var controller = application.getController(id);
							var viewName = controller.views[0];
							var view = controller.getView(viewName);
							
							var newTabPanel = view.create();
							newTabPanel.id = id;
							newTabPanel.title = record.get('text');
							newTabPanel.icon = record.get('icon');
							newTabPanel.closable = true;
							main.add(newTabPanel);
							main.setActiveTab(newTabPanel);
						}else{
							main.setActiveTab(tabPanel);  
						}
						loadMask.hide();
					}
				}
			}
		});
	}

});