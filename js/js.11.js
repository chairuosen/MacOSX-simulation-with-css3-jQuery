$(document).ready(function(){
	$(".wel,.login").hide()
	console.log("Coded by Chai")
	//欢迎页隐藏
	setTimeout(function(){
		$(".wel").fadeOut(500)
	},2000)
	//背景图跟随鼠标移动 x=背景图放大倍数
	function bgMove(x){
		var zoom=x
		var zoom_percent=zoom*100+"%"
		$(".desktop_bg").css("background-size",zoom_percent)
		$(window).mousemove(function(e){
			var mouseX=e.clientX
			var mouseY=e.clientY
			var win_width=$(window).width()
			var win_height=$(window).height()
			var bg_width=zoom*win_width
			var bg_height=zoom*win_height
			var bgX=-(mouseX*bg_width)/win_width+mouseX
			var bgY=-(mouseY*bg_height)/win_height+mouseY
			var poxy=bgX+"px "+bgY+"px"
			$(".desktop_bg").css("background-position",poxy)
			//console.log(poxy)
		})
	}
	bgMove(1.05);

	var timestamp=0;//判断后面是否连击的时间戳
	var _icon_default=$(".icons").html();//初始图标状态存一份备用
	//桌面刷新
	$("#refresh").click(function(){
		all_clear();
		console.info(_icon_default)
		$(".icons").empty().append(_icon_default);
		setTimeout(function(){
			icon_reg(0,0);
			roll();
		},1)
	});
	//桌面自动左对齐
	$("#autolist").click(function(){
		all_clear()
		icon_reg(1,1);
	});
	$(".launch_pad,.finder,.taskman").hide();
	var win_width=$(window).width();
	$(".launch_pad>.all_pad>div").width(win_width);

	//DOCK栏
	$(".dock ul li a").mouseenter(function(){
		var current_icon = parseInt($(this).parent().index());		
		$(".dock ul li:eq(" + current_icon + ")").find("a").height("70").width("70");
		$(".dock ul li:eq(" + current_icon + ")").next().find("a").height("60").width("60");
		$(".dock ul li:eq(" + current_icon + ")").prev().find("a").height("60").width("60");
		$(".dock ul li").not(":eq("+current_icon+"),:eq(" + (current_icon+1) + "),:eq(" + (current_icon-1)+ ")").find("a").height("50").width("50");
	});
	$(".dock ul").mouseleave(function(){
		$(".dock ul li a").height("50").width("50");
	});
	//DOCK栏 LAUNCH PAD按钮
	$("li.launch_dock").click(function(){
		if($(".launch_pad").show().css("opacity")=="0"){
			$(".desktop,.icons").hide();
			$(".launch_pad").css({"opacity":"1","-webkit-transform":"scale(1)"});
		}else{
			$(".launch_pad").css({"opacity":"0","-webkit-transform":"scale(1.3)"});
		setTimeout(function(){
			$(".launch_pad").hide();
			$(".desktop,.icons").show();
		},200);}	
		return false;
	});
	//LAUNCH PAD 拖动
	var mouse_down_x,pad_x;
	$(".launch_pad").mousedown(function(e){
		mouse_down_x=e.clientX;
		pad_x=parseInt($(".all_pad").css("left"));
		$(window).mousemove(function(e){
			i=e.clientX-mouse_down_x;
			$(".all_pad").css("left",pad_x+i+"px");
		});
		return false;
	});
	var max_zindex=15;//桌面程序窗口的层级

	//程序窗口拖动
	$(".safari_top h2,.finder_top h2").mousedown(function(e){
		$(".safari_cover").css("z-index","999");
		var _parent=$(this).parent().parent();
		max_zindex++;
		_parent.css("z-index",max_zindex);

		mouse_down_x=e.clientX;
		mouse_down_y=e.clientY;
		finder_x=parseInt( _parent.css("left"));
		finder_y=parseInt( _parent.css("top"));
		$(window).mousemove(function(e){
			x=e.clientX-mouse_down_x;
			y=e.clientY-mouse_down_y;
			 _parent.css("left",finder_x+x+"px");
			if(finder_y+y>=0){
			 _parent.css("top",finder_y+y+"px");
			}else{
			 _parent.css("top","0px");
			}
		});
	});
	//所有鼠标抬起事件的集合
	$(window).mouseup(function(e){
		if(e.which==1){$(".context_menu").fadeOut(100)}
		$(window).unbind("mousemove");
		bgMove(1.05)
		$(".safari_cover").css("z-index","-1");
		$(".selector").hide();
	});
	//launchpad抬起时判断拖动有没有超出全部宽度
	$(".launch_pad").mouseup(function(){
		$(window).unbind("mousemove");
		var now_left=parseInt($(".all_pad").css("left"));
		var all_long=($(".all_pad div").length-1)*win_width;

		if(now_left>0){$(".all_pad").animate({left:"0px"},500);}
		else if(now_left<-all_long){$(".all_pad").animate({left:"-"+all_long+"px"},500);}
		else{	
			if(Math.abs(parseInt($(".all_pad").css("left"))%win_width)<win_width/2)
			{
				n = Math.abs(parseInt(parseInt($(".all_pad").css("left"))/win_width));
				$(".all_pad").animate({left:n*win_width+"px"},500);
			}else{
				n = parseInt(parseInt($(".all_pad").css("left"))/win_width)-1;
				$(".all_pad").animate({left:n*win_width+"px"},500);
			}
		}
		$(".launch_pad").css("cursor","default");
		return false;

	});
	//当前程序永远最前
	$(".desktop div").click(function(){
		max_zindex++;
		$(this).css("z-index",max_zindex);
	});
	//safari默认首页，不打开safari先不加载
	$(".safari_dock").click(function(){
		if($(".safari_main iframe").attr("src")==""){
			$(".safari_main iframe").attr("src","http://reeoo.com")
		}
	});
	//DOCK和程序窗口关联
	$(".finder_dock,.safari_dock").click(function(){
		var the_name=$(this).attr("class").replace("_dock","")
		max_zindex++;
		$(".win."+the_name).css("z-index",max_zindex);

		if($(".launch_pad").css("display")=="block"){
			$(".launch_pad").css({"opacity":"0","-webkit-transform":"scale(1.3)"});
			setTimeout(function(){
			$(".launch_pad").hide();
			},200);	
			$(".desktop,.icons").show();
			if($(".win."+the_name).css("display")=="none"){
				$(".win."+the_name).show();
			}
			
		}
		else{
			$(".desktop,.icons").show();
			$(".win."+the_name).toggle();
		}
		return false;
	});


	
	//程序窗口宽度调整
	$(".right_ajust").mousedown(function(e){
		var _parent=$(this).parent();
		$(".safari_cover").css("z-index","999");

		var now_width=$(this).parent().width();
		var now_x=e.clientX;
		$(window).mousemove(function(e){
			x=e.clientX-now_x;
			_parent.width(now_width+x);
		});
	});
	//高度调整
	$(".bottom_ajust").mousedown(function(e){
		var _main="."+$(this).parent().attr("class").replace("win ","")+"_main";
		$(".safari_cover").css("z-index","999");
		var _parent=$(this).parent();

		var now_height=$(this).parent().height();
		var now_y=e.clientY;
		$(window).mousemove(function(e){
			y=e.clientY-now_y;
			_parent.height(now_height+y);
			$(_main).height(now_height+y-50);

		});
	});
	//程序窗口关闭
	$(".red").click(function(){
		$(this).parent().parent().parent().hide();
	});
	//程序窗口交替最大化和合适窗口
	$(".green").click(function(){
		var _root=$(this).parent().parent().parent();
		var _main="."+_root.attr("class").replace("win ","")+"_main";
		if(_root.height()==$(window).height()-100){
			_root.height(500);
			_root.width(700);
			$(_main).height(450);
			_root.css({"top":"200px","left":"200px"});
		}
		else{
			_root.height($(window).height()-100);
			_root.width($(window).width()-11);
			$(_main).height($(window).height()-150);
			_root.css({"top":"0","left":"0"});
		}
		
	});
	//$(".win.finder").show();
	//finder 展示方式切换
	$(".btns li a").click(function(){
		var id=$(this).parent().index();
		$(".btns li").removeClass("current");
		$(this).parent().addClass("current");
		$(".finder_content div").hide();
		$(".finder_content div:eq("+id+")").show();
	});
	function safari_url(){
		if (!_focus){
			var test_url=$("#frame1").attr("src");
			$(".address input").val(test_url);
		}
		
	}
	
	$(window).mousedown(function(e){
		$(".info_div").hide();
		$(".wrap").css("-webkit-filter","none");
		return false;
	});
	$(".info_div").hide();
	$(".about").click(function(){
		$(".info_div").show();
		$(".wrap").css("-webkit-filter","blur(3px) saturate(1.5) ");
	});
	$(window).bind("contextmenu",function(e){return false;})

	$(".desktop_bg").mouseup(function(e){
		var start_x=e.clientX;
		var start_y=e.clientY;
		$(".icon").removeClass("selected");
		$("#del").hide();
		$(".context_menu>ul>li:eq(3)").removeClass("copy");
		if(e.which==3){
			$(".context_menu").show().css({"top":start_y+2,"left":start_x});
		}

	});
	var po_y,po_x,box_height,box_width;
	$(".desktop_bg").mousedown(function(e){
		if(e.which==1){$(".icon").removeClass("selected")}
		var start_x=e.clientX;
		var start_y=e.clientY;
		$(window).mousemove(function(e){
			var x_change=e.clientX-start_x;
			var y_change=e.clientY-start_y-20;
			
			if(x_change>=0){
				po_x=start_x;
				box_width=x_change;
			}else{
				po_x=start_x+x_change;
				box_width=-x_change;
			}
			if(y_change>=0){
				po_y=start_y;
				box_height=y_change;
			}else{
				po_y=start_y+y_change;
				box_height=-y_change;
			}
			//console.log(start_x+","+start_y+";"+x_change+","+y_change+","+po_x+","+po_y+","+box_width+","+box_height)
			if(e.which==1){
			$(".selector").show().css({"top":po_y,"left":po_x}).height(box_height).width(box_width);

				min_x=po_x;
				max_x=po_x+box_width;
				min_y=po_y;
				max_y=po_y+box_height;
				$(".icon").each(function(){
					if (
						parseInt($(this).css("top"))+75<max_y
						&&
						parseInt($(this).css("top"))+75>min_y
						&&
						parseInt($(this).css("left"))+75<max_x
						&&
						parseInt($(this).css("left"))+75>min_x
						) {
						$(this).addClass("selected")
					}else{
						$(this).removeClass("selected")
					};
				});






			}
		})
	});
	function toTwo(x){
		x=""+x;
		if (x.length==1) {
			return "0"+x;
		}else{return x;}
		;
	}
	function toWeek(x){

		if(x==1){x="一"}
		else if(x==2){x="二"}
		else if(x==3){x="三"}
		else if(x==4){x="四"}
		else if(x==5){x="五"}
		else if(x==6){x="六"}
		else if(x==7){x="日"}
		return x;

	}
	function time(){

		var _time= new Date();
		var y=_time.getYear()+1900;
		var m=toTwo(_time.getMonth()+1);
		var d=toTwo(_time.getDate());
		var h=toTwo(_time.getHours());;
		var min=toTwo(_time.getMinutes());;
		var week=toWeek(_time.getDay());
		$(".time").text(y+"年 "+m+"月"+d+"日 星期"+week+" "+h+":"+min);

	}
	time();
	setInterval(time,1000);
	
	$("input").mousedown(function(e){
		$(this).focus();
	});
	var _focus=false;
	$(".adr_url").focus(function(){
		_focus=true;
		if($(this).attr("value")=="Address:"){
			$(this).attr("value","");
		}
	});
	$(".adr_url").blur(function(){
		_focus=false;
		if($(this).attr("value")==""){
			$(this).attr("value","Address:");
		}
	});


	$(".address input").focus(function(){
		var _this=$(this);
		_this.keydown(function(event){
			if(event.keyCode==13){
				_this.blur();
				var next_url=""+_this.val();
				//console.log(next_url)
				if(next_url.substring(0,7)=="http://"){
				}else if(next_url.substring(0,7)=="file://"){}
				else{
					next_url="http://"+next_url;
				}
				$("#frame1").attr("src",next_url);
				_this.val(next_url);
			}
		});				
	})
	$(".login_box input").focus(function(){
		var _this=$(this);
		_this.keydown(function(event){
			if(event.keyCode==13){
				_this.blur();
				$(".login").css({"opacity":"0","-webkit-transform":"scale(1.3)"});
				setTimeout(function(){
					$(".login").hide();
				},300)
			}
		});				
	})
	

	var now_icon,copyed_icon,copyed_name,copyed_logo,copyed_type,copyed_works,copyed_url;
	
	function roll(){
		$(".icon").unbind("mousedown").unbind("mouseup").unbind("mousemove").unbind("click");

		$(".icon").click(function(){

			timestamp_now=(new Date()).valueOf();

			v=timestamp_now-timestamp;
			if(v<200){
				var _type="."+$(this).data("type")+"_dock"
				var _work=$(this).data("work")
				if(_work!="1"){
					$(_type).click();
				}else{
					var _url=$(this).data("url")
					$(".safari").show();
					setTimeout(function(){
						if(_url.substring(0,1)=="/"){
							_url=document.location.href+_url.replace("/","")
						}
						$("#frame1").attr("src",_url);
					},10)
				}
				
			}
			timestamp=timestamp_now;
		});

		var po_x,po_y,po_x2,po_y2,_this;
		$(".icon").mousedown(function(e){

			$(this).css("z-index","99999");
			var start_x=e.clientX;
			var start_y=e.clientY;
			//$(".context_menu>ul>li:eq(2)").addClass("copy");
			
			if((ctrl==false)&&(e.which!=3)){
				
					$(".icon").removeClass("selected");
				
			}
			
			$(this).addClass("selected");
			
			$("#del").show();
			_select();
			if(e.which==3){
				$(".context_menu").show().css({"top":start_y+2,"left":start_x});
			}

			
			if(e.which==1){
				_this=$(this);

				var down_x=e.clientX;
				var down_y=e.clientY;
				po_x=parseInt(_this.css("left"));
				po_y=parseInt(_this.css("top"));
				po_x2=po_x;
				po_y2=po_y;
				//console.log("11111111111111111111")
				clearXY(po_x,po_y);
				var dx=0,dy=0;
				$(window).mousemove(function(e){
					//if((ctrl==false)&&(e.which!=3)){$(".icon").removeClass("selected");}
					$("#del").hide();
					dx=e.clientX-down_x;
					dy=e.clientY-down_y;
					po_x2=po_x+dx;
					po_y2=po_y+dy;
					if(Math.abs(dx)>20||Math.abs(dy)>20){
						_this.removeClass("selected");
						_this.css({"top":po_y2,"left":po_x2});
						//console.log(dx,dy,po_x,po_y)
					}else{
						_this.css({"top":po_y,"left":po_x});
					}
					
				});
			}

		});
			
			$(".icon").mouseup(function(e){
				$(this).css("z-index","0");
				if(e.which==1){

					var p=setPosition(po_x2,po_y2,150,150)
					var px=p.x;
					var py=p.y;
					_this.css({
						"top":py,
						"left":px,
					})
				}
				//console.log("55555555555555555555555")
				//console.log(fx)
				//console.log("=================",num++,"================")
			});
	}
	function icon_reg(x,y){
		var _x=x;
		var _y=y;
		$(".icon").each(function(){
			po_x2=_x||parseInt($(this).css("left"))
			po_y2=_y||parseInt($(this).css("top"))
			var p=setPosition(po_x2,po_y2,150,150)
			var px=p.x;
			var py=p.y;
			$(this).css({
				"top":py,
				"left":px,
			})
		});
	}
	setTimeout(function(){
		icon_reg()
	},0)	
	roll();
	var ctrl=false;
	function _select(){
		$(window).unbind("keydown").unbind("keyup");
		var v=false,a=false,copytime=(new Date()).valueOf(),alt=false,Z=false;
		$(window).keydown(function(e){

			if(e.keyCode==46){
				$("#del").click();
			}else if(e.keyCode==17||e.keyCode==91){
				ctrl=true;
				//console.log("ctrl 1")
			}else if(e.keyCode==67){
				//console.log("c 1")
				$("#copy.copy").click();
			}else if(e.keyCode==86){
				v=true;
				//console.log("v 1")
			}else if(e.keyCode==18){
				//console.log("alt 1")
				alt=true
				t=true;
			}else if(e.keyCode==90){
				Z=true;
				//console.log("z 1")
			}else if(e.keyCode==65){
				a=true;
			}else if(e.keyCode==13){
				$("#open").click();
			}
			if ((copytime!=(new Date()).valueOf()>1000)&&(ctrl&&v)) {
				//console.log("ctrl+v")
				
				if(copytime!=(new Date()).valueOf()){
					start_x=0;
					start_y=0;
					_paste(start_x,start_y);	
				}
			};
			if(ctrl&&a){
				$(".icon").addClass("selected")
				return false;
			}
			if(alt){
				if(Z){
					if(t){

						$(".icons,.desktop").hide();
						copyWinToTask()
						setTaskmanCss()
						$(".taskman").fadeIn(300);
						t=false;
					}else{
						_task_change()
					}
				}
			}
			
		});
		$(window).keyup(function(e){

			if(e.keyCode==46){
				$(".selected").remove();
			}else if(e.keyCode==17||e.keyCode==91){
				ctrl=false;
				//console.log("ctrl 0")
			}else if(e.keyCode==67){
				c=false;
				//console.log("c 0")
			}else if(e.keyCode==86){
				v=false;
				//console.log("v 0")
			}else if(e.keyCode==18){
				//console.log("alt 0")
				alt=false
				t=false
				if($(".launch_pad").css("display")=="block"){
					$(".launch_pad").css({"opacity":"0","-webkit-transform":"scale(1.3)"});
					setTimeout(function(){
					$(".launch_pad").hide();
					},200);	
				}
				$(".taskman").fadeOut(100,function(){
					$(".icons,.desktop").show();
					_window_change();
					$(".taskman_margin").empty();
					 
				});
			}else if(e.keyCode==90){
				//console.log("z 0")
				Z=false
			}else if(e.keyCode==65){
				a=false
			}
		});
	}
	_select();
	$("#del").click(function(){
		if($(this).hasClass("del")){
			if(confirm("确定删除此文件?")){
				$(".selected").each(function(){
				x=parseInt($(this).css("left"))
				y=parseInt($(this).css("top"))
				clearXY(x,y)
				$(this).remove();
				});
				$("#del").removeClass("del");
				return false;

			}

			$("#del").removeClass("del");

		}
		
		
	})


	function setPosition(x,y,width,height){
		//console.log("22222222222222222222",x,y,width,height)
		if(x%width<=width/2){
			px=(parseInt(x/width))*width;
		}else{
			px=(parseInt(x/width)+1)*width;
		}
		if(y%height<=height/2){
			py=(parseInt(y/height))*height;
		}else{
			py=(parseInt(y/height)+1)*height;
		}
		ss=setXY(px,py)
		xx=ss.x
		yy=ss.y
		aaa=toFour(xx)+""+toFour(yy);
		fx[aaa]=1;
		return {
			x:xx,
			y:yy
		}
	}
	var _copy= new Array();
	$("#copy").click(function(){
		if($(this).hasClass("copy")){

			console.warn("=====================COPY BEGIN===================")
			_copy= new Array();
			for(var i=0;i<$(".selected").length;i++)
			{
				now_icon=$(".selected:eq("+i+")");
				copyed_name=now_icon.find("h4").text();
				copyed_logo=now_icon.find("img").attr("src");
				copyed_type=now_icon.data("type");
				if(now_icon.data("work")=="1"){
					copyed_works=true;
					copyed_url=now_icon.data("url")
				}else{
					copyed_works=false;
					copyed_url=""
				}
			
				_copy[i*10+1]=copyed_name
				_copy[i*10+2]=copyed_logo
				_copy[i*10+3]=copyed_type
				_copy[i*10+4]=copyed_works
				_copy[i*10+5]=copyed_url
				
				console.warn("COPY:",_copy[i*10+1],_copy[i*10+2],_copy[i*10+3],_copy[i*10+4],_copy[i*10+5])
				console.log(_copy)
				console.warn("=====================COPY END=====================")
			}
		}
		
		$("#copy").removeClass("copy");
		if($(".selected").length!=0){
			$("#paste").addClass("paste");
			$(".icon").removeClass("selected");
		}
		
		

	});
	
	$("#paste").click(function(e){
		start_x=e.clientX||window.event.clientX||0;
		start_y=e.clientY||window.event.clientY||0;
		_paste(start_x,start_y);		
	});
	$("#open").click(function(){
		$(".selected").each(function(){
			var _this=$(this)
			var _type="."+$(this).data("type")+"_dock"
			var _work=$(this).data("work")
				if(_work!="1"){
					$(_type).click();
				}else{
					var _url=$(this).data("url")
					$(".safari").show();
					setTimeout(function(){
						if(_url.substring(0,1)=="/"){
							_url=document.location.href.replace("/index.html","")+_url
						}
						$("#frame1").attr("src",_url);
					},10)
				}
		});
		$(".icon").removeClass("selected")
	})
	var start_x=0,start_y=0;
	function _paste(start_x,start_y){
		timestamp_now=(new Date()).valueOf();
		if(timestamp_now-timestamp>1000&&$("#paste").hasClass("paste"))
		{	
			$(".icon").removeClass("selected");
		
			for(var i=1;i<(parseInt((_copy.length)/10)+2);i++)
			{	
				timestamp=timestamp_now
				console.warn("====================paste BEGIN===================")
				var p=setPosition(start_x,start_y,150,150)
				
				var px=p.x;
				var py=p.y;
				
				console.log("paste AT:",px,py)
				copyed_name=_copy[(i-1)*10+1]
				copyed_logo=_copy[(i-1)*10+2]
				copyed_type=_copy[(i-1)*10+3]
				console.warn("ALL:",_copy,"i:",i)
				console.warn("paste:",_copy[(i-1)*10+1],_copy[(i-1)*10+2],_copy[(i-1)*10+3],_copy[(i-1)*10+4],_copy[(i-1)*10+5])
				var n=$(".icon[data-type="+copyed_type+"]").length;
				var the_paste
				if (copyed_works) {
					the_paste="<div class='icon selected' data-type='"
					+copyed_type
					+"'"
					+" data-work='"
					+copyed_works
					+"' data-url='"
					+copyed_url
					+"'"
					+" style='top:"
					+ py
					+"px;left:"
					+px
					+"px;'><a href='javascript:void(0);''><div><img src='"
					+copyed_logo
					+"'></div><h4>"
					+copyed_name
					+" ("
					+n
					+")</h4></a></div>"
				}else{
					the_paste="<div class='icon selected' data-type='"
					+copyed_type
					+"' style='top:"
					+ py
					+"px;left:"
					+px
					+"px;'><a href='javascript:void(0);''><div><img src='"
					+copyed_logo
					+"'></div><h4>"
					+copyed_name
					+" ("
					+n
					+")</h4></a></div>"
				}
				

				
				$(".icons").append(the_paste);

				aaa=toFour(px)+""+toFour(py);
				fx[aaa]=1;
				console.warn("====================paste END("+ num++ +")==================")
			}
		//$("#paste").removeClass("paste");
		}
		setTimeout(roll,1);	
		
	}
	var num=1;
	var fx= new Array()
	function toFour(i){
		if(i==0){i="0000"}
		else{
			i=""+i;
		if(i.length==1){i="000"+i}
		if(i.length==2){i="00"+i}
		if(i.length==3){i="0"+i}
		}
		
		//return parseInt(i);
		return i;
	}
	function isItOK(x,y){
		//console.log("44444444444444444444")
		var a=toFour(x)+""+toFour(y)
		if(fx[a]==undefined||fx[a]=="undefined"){
			//console.log(x,y,a,fx[a],"isItOK-OK")	
			return true;
			
		}else{
			//console.error(x,y,a,fx[a],"isIt NOT OK")
			return false;
		}

	}
	function clearXY(x,y){
		var a=toFour(parseInt(x))+""+toFour(parseInt(y))
		fx[a]=undefined;
		//console.log("clear",x,y)
		//console.log(a,fx[a])
	}
	function all_clear(){
		fx=new Array()
		/*
		$(".icon").each(function(){
			cx=$(this).css("left")
			cy=$(this).css("top")
			clearXY(cx,cy)
		});
		*/
	}
	function setXY(x,y){
		//console.log("3333333333333333333333")
		var setx=x,sety=y;

		for(i=1;i<50;i++)
		{
			if (isItOK(setx,sety)==true) {
				//console.log("setXY-",setx,sety)
			break;
			}
			else{
				//console.error("setXY-ERROR",setx,sety)
				if(sety+300<$(window).height()){
					if(sety<0){
						setx=setx
						sety=0
					}else{
						setx=setx
						sety=sety+150
					}
					
				}
				else{
					setx=setx+150;
					sety=0;
				}
				
				
			}
		}

		return{x:setx,y:sety}
	}
	function checkAll(){
		if($(".selected").length!=0){
			$("#open").addClass("open");
			$("#copy").addClass("copy");
			$("#del").addClass("del");
			$("#autolist,#refresh").hide();
		}else{
			$("#open").removeClass("open");
			$("#copy").removeClass("copy");
			$("#del").removeClass("del");
			$("#autolist,#refresh").show();
		}
		safari_url();
	}
	setInterval(checkAll,1)
	

	//TASK MAN]
	var last_time=0;
	function _task_change(){
		var task_num=$(".taskman_margin>div>div").length
		now_time=(new Date()).valueOf();
		if(now_time-last_time>300){
			last_time=(new Date()).valueOf();
			$(".taskman_margin>div>div").each(function(){
				var _transform= new Array();
				 _zindex=parseInt($(this).css("z-index"))
				_transform=$(this).css("-webkit-transform").replace("matrix3d(","").replace(")","").split(",");
				_translateZ=parseInt(_transform[12]/14.142135623730948)*20
				//console.log($(this).attr("class").replace("taskwin ",""))
				//console.log("BEFORE:",_translateZ,_zindex)
				if(_zindex==task_num){
					_zindex_=1
					_translateZ_=(-200*(task_num-1))
				}else{
					_zindex_=_zindex+1
					_translateZ_=_translateZ+200

				}
				_transform_="perspective(1000px) rotateY(20deg) translateY(200px) translateZ("
					+ _translateZ_ 
					+"px)"
				$(this).css("-webkit-transform",_transform_).css("z-index",_zindex_)
				//_transform={a};
				//console.log("AFTER:",_translateZ,_zindex)
			});
		}
		
	}
	function _window_change(){
		var now_win_z=$(".taskman_margin>div>div").length
		$(".taskman_margin>div>div").each(function(){
			if(
				$(this).css("z-index")==now_win_z
			){
				now_win="."+$(this).attr("class").replace("taskwin ","")
				//setTimeout(function(){
					max_zindex++;
					$(now_win).css("z-index",max_zindex).show();
				//},300)
				
			}
		});

	}
	function setTaskmanCss(){
		$(".taskman_margin>div>div").addClass("no-transition");
		var task_num=$(".taskman_margin>div>div").length
		for(var i=0;i<task_num;i++){
			z=task_num-i
			_t="perspective(1000px) rotateY(20deg) translateY(200px) translateZ("
				+ i*(-200) 
				+"px)"
			$(".taskman_margin>div:eq("+i+")>div").css("-webkit-transform",_t).css("z-index",z)
		}
		setTimeout(function(){
			$(".taskman_margin>div>div").removeClass("no-transition");
		},1)
	}
	function copyWinToTask(){
		if($(".taskman_margin").html()==""){
			//console.log("COPY WIN SUCCESS")
			$(".desktop .win").each(function(){
				var _name=$(this).attr("class").replace("win ","")
				var _inlineCss=$(this).attr("style")||""
				var _content=$(this).html()
				var _alldiv="<div><div class='taskwin "
				+_name
				+"' style='"
				+_inlineCss
				+"position:relative;top:0;left:-20%;box-shadow: -100px 10px 70px -30px rgba(50,50,50,0.5);'>"
				+_content
				+"</div></div>";
				//console.log("COPY:",_name)
				$(".taskman_margin").append(_alldiv)
			});
			$(".taskman_margin>div>div").show();
		}else{
			console.log("COPY WIN ERROR")
		}
		
	}
});

