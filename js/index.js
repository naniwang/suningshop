$(function(){
	$(".nav-left>div,.nav-right>div").hover(function(){
		$(this).children("div").show();
		$(this).children("a").find("i").addClass("iconfont icon-shanglajiantou");
	},function(){
		$(this).children("div").hide();
		$(this).children("a").find("i").addClass("iconfont icon-xialajiantou");
	})
	
	$(".search-input").mouseup(function(){
		$(".box-none").show();
	})
	$("#none-btn").click(function(){
		$(".box-none").hide();
	})
	
	
	$(".second-list li").each(function(){
		$(this).mouseenter(function(){
			index=$(this).index();
			$(".third-list").find(".third-item").eq(index).show();
		}).mouseleave(function(){
			$(".third-list").find(".third-item").hide();
		})
		$(".third-list").mouseenter(function(){
			$(".third-list").find(".third-item").eq(index).show();
		}).mouseleave(function(){
			$(".third-list").find(".third-item").hide();
		})
	})
	
	$('.banner-wraper').hover(function(){
		$(this).children("em").show();
	},function(){
		$(this).children("em").hide();
	})
	
	$(".banner-wraper em").hover(function(){
		$(this).css("opacity","0.5");
	},function(){
		$(this).css("opacity","0.4");
	})
	
	var index=0;
	var timer=setInterval(autoPlay,3000);
	function autoPlay(){
		index++;
		if (index==$('.banner-wraper li').length) {
			index=0;
		}
		$(".banner-wraper").find("li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$(".banner-nav").find('span').eq(index).css("background","#fff").siblings().css("background","");
	}
	$(".banner-nav").find('span').eq(index).css("background","#fff");
	$(".banner-wraper").mouseenter(function(){
		clearInterval(timer);
	}).mouseleave(function(){
		timer=setInterval(autoPlay,3000);
	})
	$('#prev').click(function(){
		index-=2;
		if (index==-1) {
			index=$(".banner-wraper li").length-1;
		}
		autoPlay();
	})
	$('#next').click(function(){
		if (index==$(".banner-wraper li").length) {
			index=0;
		}
		autoPlay();
	})
	
	$(".float-title").children("em").hover(function(){
		$(this).next().show();
	},function(){
		$(this).next().hide();
	})
	
	$(".side-mid").find("div").hover(function(){
		$(this).children("div").show().stop().animate({"left":"-50px"},500).css({"background":"#FF6600","color":"#666"});
	},function(){
		$(this).children("div").stop().animate({"left":0},500).css({"background":"","color":"#f60"});
	})
	$(".side-bot").find("div").hover(function(){
		$(this).children("div").show().stop().animate({"left":"-70px"},500).css({"background":"#FF6600","color":"#666"});
	},function(){
		$(this).children("div").stop().animate({"left":0},500).css({"background":"","color":"#f60"});
	})
	
	$(".side-bot-saomiao").hover(function(){
		$(this).children("div").stop().animate({"left":"-170px"}).show();
	},function(){
		$(this).children("div").stop().animate({"left":"0"}).hide();
	})
	
	var count=0;
	var timer=setInterval(sport,1500);
	function sport(){
		count++;
		if (count==$(".slidePic dd").find("a").length) {
			count=0;
		}
		$(".slidePic dd").find("a").eq(count).fadeIn(1000).siblings().fadeOut(1000);
	}
	$(".slidePic dd").mouseenter(function(){
		clearInterval(timer);
	}).mouseleave(function(){
		timer=setInterval(sport,1500);
	})
	
	$.get("http://47.104.244.134:8080/goodsbytid.do",{"tid":13,"page":1,"limit":11},function(data){
		console.log(data)
		var str="";
		var data=data.data;
		for (var i=1; i<data.length; i++) {
			str+=`
			<li><a href="detail.html?id=${data[i].id}">
				<img src="${data[i].picurl}"/>
				<p class="name">${data[i].name}</p>
				<p class="price">￥${data[i].price}</p>
				</a>
			</li>`
		}
		$(".count-list").html(str);
		$(".pinpai-list").html(str);
		$(".zhipin-list").html(str);
	})	
	
	
	$(window).scroll(function(){
		var flag=true;
		var sTop=$(window).scrollTop()
		if(sTop>=400){
			$(".float-bar").css("display","block");
		}else{
			$(".float-bar").css("display","none");
		}
		if (flag) {
			$(".main-title").each(function(){
				if (sTop>=$(this).offset().top-$(this).next().outerHeight()/2) {
					var index=$(this).index();
//					$("#floorNav").find("li").eq(index).addClass("active").siblings().removeClass("active");
				}
			})
		}
	})
	
	$("#floorNav li:not(:last)").click(function(){
		flag=false;
		var index=$(this).index();
		$("body,html").animate({"scrollTop":$(".main-title").eq(index).offset().top},500,function(){
			flag=true;
		});
//		$(this).addClass("active").siblings().removeClass("active");
	})
	
	$("#floorNav li:last-of-type").click(function(){
		flag=false;
		$("body,html").animate({"scrollTop":0},function(){
			flag=true;
		});
	})
	
	
	var now=new Date();
	var end=new Date("2019-1-19");
	var time=(end.getTime()-now.getTime())/1000;
	
	function showTime(){
		if (time<0) {
			return;
		}
		var day=parseInt(time/3600/24)
		var hours=parseInt((time-day*24*3600)/3600);
		var minutes=parseInt((time-day*24*3600-hours*3600)/60);
		var seconds=parseInt(time-day*24*3600-hours*3600-minutes*60);
		if (hours<10) {
			hours="0"+hours;
		}
		if (minutes<10) {
			minutes="0"+minutes;
		}
		if (seconds<10) {
			seconds="0"+seconds;
		}
		$(".hour").html(hours);
		$(".minute").html(minutes);
		$(".second").html(seconds);
	}
	showTime();
	var timer=setInterval(function(){
		if (time>0) {
			time--;
			showTime();
		}else{
			clearInterval(timer);
		}
	},1000)
})
