$(function(){
	$.get("http://47.104.244.134:8080/cartlist.do",{token:$.cookie("token")},function(data){
		console.log(data);
		var str = "";
		for(var i = 0; i < data.length; i++){
			str+=`
				<li data-id="${data[i].id}" data-gid="${data[i].gid}">
					<input type="checkbox" class="anniu">
					<div class="_left">
						<img src="${data[i].goods.picurl}"/>
						<p>${data[i].goods.name}</p>
						<p class="danjia">${data[i].goods.price}</p>
						<input type="button" value="购买"/>
					</div>
					<div class="_right">
						<input class="jian" type="button" value="-"/>
						<span class="num">${data[i].count}</span>
						<input class="jia" type="button" value="+" />
						<input class="del" type="button" value="删除" />
						<p class="preSumprice">${data[i].count*data[i].goods.price}<p>
					</div>
				</li>`
		}
		$("#list").html(str);
		//默认选中所有商品
		$(".anniu").prop("checked",true);
		//计算商品总价
		totlePrice();
		//点击加
		$(".jian").on("click",function(){
			changePrice(this,-1);
		})
		//点击减
		$(".jia").on("click",function(){
			changePrice(this,1);
		})
		//点击删除
		$(".del").on("click",function(){
			changePrice(this,0);
		})
		//点击复选框，更新总价
		$(".anniu").on("click",function(){
			totlePrice();
		})
	})
	
	function totlePrice(){
		var sum = 0;
		$(".anniu:checked").siblings("._right").find(".preSumprice").each(function(){
			sum += parseInt($(this).html());
		});
		$(".heji").html(sum);
	}
	
	function changePrice(_this,num1){
		//点击加号
		if(num1==1){
			var num = $(_this).prev().html();
			$(_this).prev().html(++num);
		}
		//点击减号
		if(num1==-1){
			var num = $(_this).next().html();
			$(_this).next().html(--num);
			if (num==0) {
				num1=0;
				$(_this).parent().parent().remove();
			}
		}
		//点击删除
		if (num1==0) {
			$(_this).parent().parent().remove();
		}
		//更新每一行的总价
		var price = $(_this).parent().siblings("._left").find(".danjia").html()*num;
		$(_this).siblings(".preSumprice").html(price)
		//计算所有商品的总价
		totlePrice();
		
		//更新购物车
		$.get("http://47.104.244.134:8080/cartupdate.do",
		{	
			id:$(_this).parent().parent().attr("data-id"),
			gid:$(_this).parent().parent().attr("data-gid"),
			num:num1,
			token:$.cookie("token")
		})
	}
})