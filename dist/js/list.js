$(function(){
	$(".fenlei").hover(function(){
		$("#nav-list").show().stop().animate({"height":"163px"},500);
	},function(){
		$("#nav-list").mouseleave(function(){
			$("#nav-list").stop().animate({"height":0},500,function(){
				$("#nav-list").hide();
			});
		})
	})
	
	
	$.get("http://47.104.244.134:8080/goodstypelist.do",{"l":"1"},function(data){
		console.log(data);
		var tr="";
		for (var i=0; i<data.length; i++) {
			tr+=`
				<li>${data[i].name}</li>
			`
		}
		$("#nav-list").html(tr);
	})
	
	$.get("http://47.104.244.134:8080/goodsbytid.do",{"tid":13,"page":1,"limit":20},function(data){
		console.log(data)
		var str="";
		var data=data.data;
		for (var i=0; i<data.length; i++) {
			str+=`
			<li><a href="detail.html?id=${data[i].id}">
				<p>${data[i].info}</p>
				<img src="${data[i].picurl}"/>
				<p>${data[i].name}</p>
				<span>￥${data[i].price}</span>
				<p>点评:${data[i].star}颗星</p>
				<p>${data[i].pubdate}</p>
				</a>
			</li>`
		}
		$("#list").html(str);
	})
})
