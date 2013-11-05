function getCookie(c_name){
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if(c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
}
$(document).ready(function(){
	$("#welcome").hide();
	visit=getCookie("first_visit");
	if (visit!=null && visit!="") {
		alert("1");
		document.cookie="first_visit=1(1)"
	};
	var win_h=$(window).height();
	$("#welcome").height(win_h);
	$(".enter").click(function(){
		$("#welcome").fadeOut(500);
		$("html").animate({
            scrollTop: "0"
        }, 1);
        return false;
	});
	$("a[href='#']").click(function(){
		return false;
	});
	$("div").not($(".group_one_left")).click(function(){
		if($(".group_one_left").css("width")!="280px"){
			$(".group_one_left").stop().animate({width:280},500);
			$(".product_group_lv2 li").removeClass("active_tab");
		}
	});


	$(".products_more").click(function(){
		if($(".group_one_left").css("width")=="280px"){
			$(".group_one_left").stop().animate({width:500},500);
			var nike_tab_now="'"+$(".nike .product_group_lv3 ul:visible").attr("class").replace(" ca","")+"'";
			$("a[data-tab="+ nike_tab_now +"]").parent().addClass("active_tab");
			var adi_tab_now="'"+$(".adi .product_group_lv3 ul:visible").attr("class").replace(" ca","")+"'";
			$("a[data-tab="+ adi_tab_now +"]").parent().addClass("active_tab");
		}else{
			$(".group_one_left").stop().animate({width:280},500);
			$(".product_group_lv2 li").removeClass("active_tab");
		}
	});
	//$(".group_one_left").mouseleave(function(){$(this).stop().animate({width:280},500);$(".product_group_lv2 li").removeClass("active_tab");});
	$(".nike .product_group_lv2 a").click(function(){
		if($(".group_one_left").css("width")=="280px"){
			var tab_id = $(this).attr("data-tab");
			$(this).parent().addClass("active_tab");
			$(".nike .product_group_lv3 ul").hide();
			$(".nike .product_group_lv3 ul."+tab_id).fadeIn(100);
			$(".group_one_left").stop().animate({width:500},500);
			var adi_tab_now="'"+$(".adi .product_group_lv3 ul:visible").attr("class").replace(" ca","")+"'";
			$("a[data-tab="+ adi_tab_now +"]").parent().addClass("active_tab");
		}else{
			var tab_id = $(this).attr("data-tab");
			$(".nike .product_group_lv2 li").removeClass("active_tab");
			$(this).parent().addClass("active_tab");
			$(".nike .product_group_lv3 ul").hide();
			$(".nike .product_group_lv3 ul."+tab_id).fadeIn(100);
		}
	});
	$(".adi .product_group_lv2 a").click(function(){
		if($(".group_one_left").css("width")=="280px"){
			var tab_id = $(this).attr("data-tab");
			$(this).parent().addClass("active_tab");
			$(".adi .product_group_lv3 ul").hide();
			$(".adi .product_group_lv3 ul."+tab_id).fadeIn(100);
			$(".group_one_left").stop().animate({width:500},500);
			var nike_tab_now="'"+$(".nike .product_group_lv3 ul:visible").attr("class").replace(" ca","")+"'";
			$("a[data-tab="+ nike_tab_now +"]").parent().addClass("active_tab");
		}else{
			var tab_id = $(this).attr("data-tab");
			$(".adi .product_group_lv2 li").removeClass("active_tab");
			$(this).parent().addClass("active_tab");
			$(".adi .product_group_lv3 ul").hide();
			$(".adi .product_group_lv3 ul."+tab_id).fadeIn(100);
		}
	});
});