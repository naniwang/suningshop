$(function(){
	$("#xieyi-btn").click(function(){
		$("#mask").hide();
	})
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
	$("#suiji-yzm").html(getYzm());
	
	function yz(){
		/*var flagSum=null;
		$("#regist-btn").click(function(){
			if(flagPhone && flagNum && flagPwd){
				flagSum=true;
			}else{
				if ($("#phone").val()=="") {
					$(".error-tishi").show();
				}
				flagSum=false;
			}
		})*/
		
		$("#regist-btn").click(function(){
			if(flagPhone && flagNum && flagPwd && flagEmail){
				$.post("http://47.104.244.134:8080/usersave.do",{"username":$("#phone").val(),"password":$("#pwd").val(),"email":$("#e-mail").val(),"sex":$("#sexy").val()},function(data){
					console.log(data)
					if (code==0) {
						$(".error-tishi").show();
						$(".error-tishi").html("用户名已被占用");
					}else{
						location.href="login.html";
					}
				})
			}else{
				if ($("#phone").val()=="") {
					$(".error-tishi").show();
				}
			}
		})
		
		$("#phone").focus(function(){
			$(".error-tishi").hide();
		})
		
		//验证手机号
		var flagPhone=null;
		$("#phone").blur(function(){
			var phone=$("#phone").val();
			var reg=/^1[3578]\d{9}$/;
			if (phone!="") {
				if(reg.test(phone)){
					flagPhone=true;
					$.get("http://47.104.244.134:8080/username.do",{username:phone},function(data){
						if(data.code==0){
							$(".error-tishi").show();
							$(".error-tishi").html("用户名已被占用");
							flagPhone=false;
						}
					})
				}else{
					$(".error-tishi").show();
					$(".error-tishi").html("格式不正确，请输入正确的手机号")
					flagPhone=false;
				}
			}else{
				$(".error-tishi").show();
			}
		})
		//验证邮箱
		var flagEmail=null;
		$("#e-mail").blur(function(){
			$.get("http://47.104.244.134:8080/useremail.do",{email:$("#e-mail").val()},function(data){
				if (data.code==0) {
					$(".error-email").show();
					$(".error-email").html("邮箱已被占用")
					flagEmail=false;
				}else{
					flagEmail=true;
				}
			})
		})
		
		$("#e-mail").focus(function(){
			$(".error-email").hide();
		})
		//验证验证码
		var flagNum=null;
		$("#yzm").blur(function(){
			var sjYzm=$("#suiji-yzm").html();
			var inYzm=$("#yzm").val();
			if (inYzm==sjYzm) {
				flagNum=true;
			}else{
				$(".send-fail").show();
				flagNum=false;
			}
		})
		$("#yzm").focus(function(){
			$(".send-fail").hide();
		})
		//验证密码
		var flagPwd=null;
		$("#pwd").focus(function(){
			$(".tishi").show();
			var oPwd=$("#pwd").val();
			var reg=/^([1-9a-zA-Z]|.){6,20}$/;
			if(reg.test(oPwd)){
				flagPwd=true;
			}else{
				flagPwd=false;
			}
		})
		$("#pwd").blur(function(){
			$(".tishi").hide();
		})
	}
	yz();
})
