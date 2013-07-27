Ext.define('Blog.view.Login', {
	
	extend: 'Ext.window.Window',
	
	alias: 'widget.bloglogin',

	id: 'bloglogin',

	icon: '/extjs/resources/images/lock.png',
	
	initComponent: function () {
		var me = this;
		me.vCodeImg = Ext.create('Ext.Img', {
			src: '/index.php/vcode',
			style: 'cursor:pointer',
			listeners: {
				click: me.onRefrehCode,
				element: 'el',
				scope: me
			}
		});
		me.form = Ext.create('Ext.form.Panel', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 50,
				labelStyle: 'font-weight:bold',
				allowBlank: false
			},
			items: [
				{ xtype: 'textfield', fieldLabel: '用户名',width: 265, blankText: '用户名不能为空', name: 'username', id: 'username', fieldCls: 'textfield_username' },
				{ xtype: 'textfield', fieldLabel: '密码',width: 265, blankText: '密码不能为空', name: 'password', id: 'password', inputType: 'password', fieldCls: 'textfield_password' },
				// 去掉了验证码
				/*{ xtype: 'container', layout: 'hbox', items: [{
					xtype: 'textfield', fieldLabel: '验证码',width: 180, name: 'vcode', maxLength: 4, minLength: 4, blankText: '验证码不能为空',style: 'margin-right:5px'
				}, {
					xtype: 'container',width: 80, height: 20, items: me.vCodeImg
				}]}*/
			],
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				layout: { pack: 'center' },
				items: [
					{ text: '登录', id: 'Login', width: 80, disabled: true, formBind: true, handler: this.onLogin, scope: me },
					{ text: '重置', id: 'Reset', width: 80, handler: me.onResetForm, scope: me }
				]
			}],
			listeners: {
				afterRender: function (loginform, options) {
					this.keyNav = Ext.create('Ext.util.KeyNav', me.el, {
						enter: function () {
							var form = me.form.getForm();
							if (form.isValid()) {
								me.onLogin();
							}
						},
						scope: me
					});
				}
			}
		});
		Ext.apply(me, {
			height: 125,
			width: 300,
			id: 'loginWindow',
			title: '后台登陆',
			closable: false,
			modal: true,
			plain: true,
			resizable: false,
			layout: 'fit',
			items: me.form
		});
		me.callParent(arguments);
	},
	
	onRefrehCode: function () {
		this.vCodeImg.setSrc('/index.php/vcode?_t=' + new Date().getTime());
	},
	
	onLogin: function () {
		var me = this;
		var form = me.form;
		if (form.isValid()) {
			form.submit({
				waitMsg: '验证中，请稍后...',
				waitTitle: '正在登录',
				url: '/admin/login',
				success: function (form, action) {
					me.close();
					Ext.getStore('menuStore').reload();
					//刷新底部iframe
					footerframe.location.reload();
				},
				failure: function (form, action) {
					Ext.Msg.alert('登录失败', action.result ? action.result.msg : '登录失败，请重试');
				}
			});
		}
	},
	
	onResetForm: function () {
		var me = this;
		var form = me.form;
		if (form.items.items[0]) {
			form.items.items[0].focus(true, 10);
		}
		me.onRefrehCode();
	}
});