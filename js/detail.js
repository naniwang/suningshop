$(function(){
	var id=location.search.split("=")[1];
	$.get("http://47.104.244.134:8080/goodsbyid.do",{id:id},function(data){
		console.log(data);
		str=`
			<div class="pic"><img src="${data.picurl}"/></div>
			<div class="intro">
				<h3>${data.name}</h3>
				<p>${data.info}</p>
				<p>易购价:${data.price}</P>
				<span>生产日期:${data.pubdate}</span>
				<p>评价:${data.star}颗星</p>
				<p>数量:<i id="plus">-</i><b id="num">0</b><i id="sub">+</i></p>
				<div class="purple"><a href="#" id="buy">立即购买</a><a href="#" id="toCart">加入购物车</a><a href="#" id="saoBuy">扫一扫购买</a></div>
			</div>
		`
		$(".main-con").html(str);
		
		$("#toCart").click(function(){
			var token = $.cookie("token");
			console.log(token)
			$.get("http://47.104.244.134:8080/cartsave.do",{
				gid:id,
				token:token
			},function(data){
				if(data.code==0){
					location.href = "cart.html";
				}
			})
		})
	})
})
