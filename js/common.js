//获取ID
function $id(id){
	return document.getElementById(id);
}
//取min到max的随机整数
function rand(min,max){
	return Math.round(Math.random()*(max-min)+min);
}
//获取随机的颜色值
function getColor(){
	return "rgb("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+")";
}
//创建节点
function create(node){
	return document.createElement(node);
}
//获取非行内样式值
function getStyle(obj,attr){//attr为属性
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	}
	return getComputedStyle(obj,null)[attr];
}
//事件监听
function addEvent(obj,type,fn){//事件监听
	if(obj.addEventListener){
		obj.addEventListener(type,fn);
	}else{
		obj.attachEvent("on"+type,fn);//兼容IE
	}
}
//移除事件监听			
function removeEvent(obj,type,fn){//移除事件监听
	if(obj.removeEventListener){
		obj.removeEventListener(type,fn);
	}else{
		obj.detachEvent("on"+type,fn);//兼容IE
	}
}
//添加cookie并设置保存日期
function setCookie(name,value,n){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+n);
	document.cookie=name+"="+value+";expires="+oDate;
}
//获取cookie值
function getCookie(name){
	var str=document.cookie;
	var arr=str.split("; ");
	for (var i=0; i<arr.length; i++) {
		var newArr=arr[i].split("=");
		if (name==newArr[0]) {
			return newArr[1];
		}
	}
}
//删除cookie
function removeCookie(name){
	setCookie(name,1,-1);
}
