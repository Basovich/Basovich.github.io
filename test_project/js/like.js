$(function(){	
	$(".card__like-down--hover").click(function() {
		$(this).css( "pointer-events", "none");
		$(this).prev(".card__like-down--cheked").css( "display", "block");	
		$(this).next(".card__like-up--hover").css( "pointer-events", "none");	  
	});
	$(".card__like-up--hover").click(function() {
		$(this).css( "pointer-events", "none");
		$(this).prev(".card__like-down--hover").css( "pointer-events", "none");
	  $(this).next(".card__like-up--cheked").css( "display", "block"); 

	});
});