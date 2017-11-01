	// функция для отображения фонового изображения на весь экран.
	$(function(){
		// $(".loader_inner").fadeOut(1000); 
		// $(".loader").delay(400).fadeOut(1500);
		
		function heightDetect() {
			$('.page-head').css('height', $(window).height());
		};
		heightDetect();
		$(window).resize( function() {
			heightDetect();
		});	
		
		// функция для сендвича и меню.
		$(".toggle_mnu").click(function() {
			$(".sandwich").toggleClass("active");				
		});

		$(".top_mnu ul a").click(function() {
			$(".top_mnu").fadeOut(600);
			$(".sandwich").toggleClass("active");
			$(".top_text").css("opacity", "1");
		}).append("<span>");

		$(".toggle_mnu").click(function() {
			if ($(".top_mnu").is(":visible")) {
				$(".top_text").css("opacity", "1");
				$(".top_mnu").fadeOut(600);
				$(".top_mnu li a").removeClass("fadeInUp animated");										
			} else {
				$(".top_text").css("opacity", ".1");
				$(".top_mnu").fadeIn(600);
				$(".top_mnu li a").addClass("fadeInUp animated");
			};
		});

		// плагин для скролла
		$("a[href*='#']").mPageScroll2id(); 
	});		