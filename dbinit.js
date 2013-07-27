db.dropDatabase();
db.createCollection("article");
db.createCollection("attachment");
db.createCollection("category");
db.createCollection("menu");
db.createCollection("tag");
db.createCollection("uesr");

db.system.js.insert({"_id":"getCatTree", "value":function(pId){ var cursor = db.category.find({"parent": pId}).sort({"sort_order": 1}); var arr = []; while(cursor.hasNext()){ var obj = cursor.next(); if(obj._id){ obj.children = db.eval("getCatTree('"+obj._id+"')"); } arr.push(obj); } return arr; }});

db.user.insert({
    username: "admin",
    password: "40a931abbd13db1b8c9ebd7c8c095984",
    nickname: "L.K.",
    last_login_time: null,
    last_login_ip: null,
    avatar: null,
    create_time: null
});
db.menu.insert({
	menu_name: "博文",
	controller: null,
	expanded: 1,
	leaf: 0,
	order: 1,
	icon: "extjs/resources/images/book.png",
	children: [{
    		menu_name: "文章管理",
    		controller: "Article",
    		expanded: 0,
    		leaf: 1,
    		order: 1,
    		icon: "extjs/resources/images/book.png"
		}, {
    		menu_name: "附件管理",
    		controller: "Attachment",
    		expanded: 0,
    		leaf: 1,
    		order: 2,
    		icon: "extjs/resources/images/attach.png"
		}
	]
});
db.menu.insert({
    menu_name: "分类",
    controller: null,
    expanded: 1,
    leaf: 0,
    order: 1,
    icon: "extjs/resources/images/category.png",
    children: [{
            menu_name: "分类管理",
            controller: "Category",
            expanded: 0,
            leaf: 1,
            order: 1,
            icon: "extjs/resources/images/category.png"
        }
    ]
});