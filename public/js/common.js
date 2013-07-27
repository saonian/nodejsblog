$(document).ready(function(){
	//代码高亮
	SyntaxHighlighter.autoloader(
		'applescript            http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushAppleScript.js',
		'actionscript3 as3      http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushAS3.js',
		'bash shell             http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushBash.js',
		'coldfusion cf          http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushColdFusion.js',
		'cpp c                  http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushCpp.js',
		'c# c-sharp csharp      http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushCSharp.js',
		'css                    http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushCss.js',
		'delphi pascal          http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushDelphi.js',
		'diff patch pas         http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushDiff.js',
		'erl erlang             http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushErlang.js',
		'groovy                 http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushGroovy.js',
		'java                   http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushJava.js',
		'jfx javafx             http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushJavaFX.js',
		'js jscript javascript  http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushJScript.js',
		'perl pl                http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushPerl.js',
		'php                    http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushPhp.js',
		'text plain             http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushPlain.js',
		'py python              http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushPython.js',
		'ruby rails ror rb      http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushRuby.js',
		'sass scss              http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushSass.js',
		'scala                  http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushScala.js',
		'sql                    http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushSql.js',
		'vb vbnet               http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushVb.js',
		'xml xhtml xslt html    http://liukai.sinaapp.com/public/syntaxhighlighter/scripts/shBrushXml.js'
	);
	SyntaxHighlighter.defaults['toolbar'] = false;
	SyntaxHighlighter.all();
	//固定侧边分类
	var catDiv = $("#sidebar");
	if (catDiv.length > 0){
		$(window).bind({
			scroll: function(){
				var scrollTop = $(document).scrollTop();
				if (!catDiv.attr('style') && scrollTop>=590) {
					catDiv.attr('style','position: fixed;top: 0;left: 807px;');
				}
				if (catDiv.attr('style') && scrollTop<590){
					catDiv.removeAttr('style');
				}
			}
		});
	}
	//图片延迟加载，先替换图片格式，再调用延迟加载
	$(".content img").each(function(i){
		var src = $(this).attr("src");
		$(this).attr("data-original", src);
		$(this).attr("src", "http://liukai.sinaapp.com/public/images/grey.gif");
	});
	$(".content img").lazyload({
		effect : "fadeIn"
	});
	//绑定喜欢按钮
	$(".likeicon").each(function(index, domEle){
		$(domEle).bind('click',{elm: domEle}, like);
	});
});

function like(e){
	var elm = $(e.data.elm);
	var id = elm.attr("aid");
	var numspan = $(elm.next("span").children("span:first-child")[0]);
	var num = parseInt(numspan.text());
	if(elm.attr("disabled")){
		alert("不宜操之过急-_,-！");
		return;
	}
	$.ajax({
		type: "GET",
		url: "/index.php/index/like/"+id,
		dataType: "json",
		success: function(result){
			if(result.success){
				numspan.text(num+1);
			}
			elm.attr("disabled", "true");
			setTimeout(function(){
				elm.removeAttr("disabled");
			}, 60000);
		}
	});
}