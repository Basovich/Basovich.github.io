document.addEventListener('DOMContentLoaded', function(){
  //init slider slick
  $('.js-news-slider').slick({
    lazyLoad: 'ondemand',
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    infinite: true,
    responsive: [{

      breakpoint: 579,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }

    }]
  });


  /*
  ** DROPDOWN LIST
  */
  //open dropdown
      $(document).on('click', '.js-switch-dropdown', function () {
        $(this).toggleClass('isOpen');
      });

      //close opened dropdown
      $(document).mouseup(function (e){
        let targetElem = $(".isOpen");
        if (!targetElem.is(e.target)
          && targetElem.has(e.target).length === 0) {
          $(".isOpen").removeClass("isOpen");
        }
      });
  /*============================================*/

  /*Mobile menu*/
  $(document).on('click', '.js-mobile-menu-open', function () {
    $('.main-menu').addClass('isMenuOpen');
  });

  $(document).on('click', '.js-mobile-menu-close', function () {
    $('.main-menu').removeClass('isMenuOpen');
  });
});
