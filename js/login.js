$(function(){
	function rand(min,max){
		return Math.round(Math.random()*(max-min)+min);
	}
	function getYzm(){
		var str="";
		for(var i=1; i<=6; i++){
			var tr=rand(48,102);
			if (tr>=58&&tr<=64||tr>=71&&tr<=96) {
				i--;
			}else{
				str+=String.fromCharCode(tr);
			}
		}
		return str;
	}
	$("#login-yzm").html(getYzm());
	
	$(".tab a").click(function(){
		$(this).addClass("saoma").siblings().removeClass("saoma");
	})
	
	$(".tab a:first-of-type").click(function(){
		$(".scan-login").show();
		$(".pc-login").hide();
		$(".message-login").hide();
	})
	$(".tab a:last-of-type").click(function(){
		$(".pc-login").show();
		$(".scan-login").hide();
		$(".message-login").hide();
	})
	$(".message").click(function(){
		$(".message-login").show();
		$(".scan-login").hide();
		$(".pc-login").hide();
	})
	$("#message").click(function(){
		$(".pc-login").show();
		$(".scan-login").hide();
		$(".message-login").hide();
	})
	
	$(".scan-box").mouseenter(function(){
		$(".erweima").stop().animate({"left":"-76px"},500,function(){
			$(".saomatu").show();
		})
	}).mouseleave(function(){
			$(".saomatu").hide();
			$(".erweima").stop().animate({"left":0},500);
	})
	
	$("#login-btn").click(function(){
		$.post("http://47.104.244.134:8080/userlogin.do",{name:$("#txt").val(),password:$("#pwd").val()},function(data){
			if (data.code==0) {
				$.cookie("token",data.data.token);
				location.href="index.html";
			}else{
				alert("登录失败");
			}
		})
	})
	$("#txt").val("");
	$("#pwd").val("");
})
