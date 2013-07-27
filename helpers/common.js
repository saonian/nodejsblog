var helper = function(){}

helper.prototype.isInt = function(str){
	if(str == '' || str == null){
		return false;
	}
	var regexp = /\d+/;
	return regexp.test(str)?true:false;
}

helper.prototype.isNum = function(str){
	if(str == '' || str == null){
		return false;
	}
	return isNaN(str)?false:true;
}

helper.prototype.dateFormat = function(date, format){
	var o = {
		"M+" : date.getMonth()+1, //month
		"d+" : date.getDate(),//day
		"h+" : date.getHours(), //hour
		"m+" : date.getMinutes(), //minute
		"s+" : date.getSeconds(), //second
		"q+" : Math.floor((date.getMonth()+3)/3),//quarter
		"S" : date.getMilliseconds() //millisecond
	};
	if(/(y+)/.test(format)){
		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o){
		if(new RegExp("("+ k +")").test(format)){
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}

helper.prototype.getDaysOfMonth = function(year, month) {
	if(month == 1){
		return(((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) ? 29 : 28);
	}else{
		return([31,28,31,30,31,30,31,31,30,31,30,31][month]);
	}
}

helper.prototype.getMonthName = function(date) {
	var month = new Array("December","January","February","March","April","May","June","July","August","September","October","November");
	var month2 = new Array("Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov");
	return month2[date.getMonth()];
}

helper.prototype.cutHtml = function(html, wordNum){
	var spTags = ["img","br","hr"];/*不需要成对出现的标记*/
	var contain = function(arr, it){
		for(var i=0,len=arr.length;i<len;i++){
			if(arr[i]==it){
				return true;	
			}
		}
		return false;
	}
 
	var result = [];
	/*首先截取需要的字串*/
	var wcount = 0;
	var startTags = [],endTags = [];
	var isInTag = false;
	for(var i=0,len=html.length;i<len;i++){
		var w = html[i];
		result.push(w);
		if(w=="<"){
			isInTag = true;	
		}
		if(!isInTag){
			wcount++;
			if(wcount==wordNum){
				break;	
			}
		}
		if(w==">"){
			isInTag = false;	
		}
	}
	/*对字串进行处理*/
	var j=0;
	isInTag = false;
	var isStartTag = true;
	var tagTemp = "";
	while(j<i){
		w = result[j];
		if(isInTag){
			if(w==">" || w==" " || w=="/"){
				isInTag = false;
				if(isStartTag){
					startTags.push(tagTemp);	
				}else{
					endTags.push(tagTemp);	
				}
				tagTemp = "";
			}
			if(isInTag){
				tagTemp+=w;	
			}
		}
		if(w=="<"){
			isInTag = true;
			if(result[j+1]=="/"){
				isStartTag = false;
				j++;
			}else{
				isStartTag = true;	
			}
		}
		j++;
	}
	/*剔除img,br等不需要成对出现的标记*/
	var newStartTags = [];
	for(var x=0,len=startTags.length;x<len;x++){
		if(!contain(spTags,startTags[x])){
			newStartTags.push(startTags[x]);
		}
	}
	/*添加没有的结束标记*/
	var unEndTagsCount = newStartTags.length - endTags.length;
	while(unEndTagsCount>0){
		result.push("<");
		result.push("/")
		result.push(newStartTags[unEndTagsCount-1]);
		result.push(">");
		unEndTagsCount--;
	}
	return result.join("");
}

module.exports = new helper();