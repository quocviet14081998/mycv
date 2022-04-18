//chỉ định vận tốc của hiệu ứng back-to-top và link trên menu
var v = 1;

$(".portfolio button").click(function(event) {
	var data = $(this).attr("data");
	var portfolios = $(this).siblings('.row').children();
	$(this).addClass('active');
	$(this).siblings('button').removeClass('active');
	if (data == undefined) {
		//all button
		//show all
		$(portfolios).show();
	}
	else {
		var showedElements = $(portfolios).filter("[data=" + data + "]");
		var hiddenElements = $(portfolios).not(showedElements);
		$(showedElements).show();
		$(hiddenElements).hide();
	}
	
});

toggleBackToTop();
$(window).scroll(function(event) {
	/* Act on the event */
	// console.log($(window).scrollTop());
	// console.log($("#portfolio").offset().top);
	if($(window).scrollTop() >= $("#portfolio").offset().top){
		$("header .navbar").addClass('fixed-top');
		$("header").addClass('dummy-padding');
	}
	else {
		$("header .navbar").removeClass('fixed-top');
		$("header").removeClass('dummy-padding');
	}
	toggleBackToTop();
});

$(".back-to-top").click(function(event) {
	/* Act on the event */
	// time = distance / v;
	var distance = $(this).offset().top;
	var time = distance/v;
	$("html,body").animate({scrollTop:0}, time );
});

function toggleBackToTop() {
	if ($(window).scrollTop() == 0) {
		//tắt nút back to top
		$(".back-to-top").fadeOut();
	}
	else {
		//hiện ra
		$(".back-to-top").fadeIn();
	}
}

$("header nav ul li a, #home a").click(function(event) {
	/* Act on the event */
	event.preventDefault();//Ngăn chặn không cho chạy đến phần id tương ứng với hash
	// var hash = $(this).attr('href');
	var hash = this.hash; // hàm của javascript
	var target = $(hash);
	//phần tử có id tương ứng với hash của nút được click
	var top = $(target).offset().top;
	var distance = Math.abs($(this).offset().top - top);
	var time = distance/v;
	$("html,body").animate({scrollTop:top}, time, function(){
		//cập nhật cái hash của thanh địa chỉ
		window.location.hash=hash;
	});
});