+function ($) {
  'use strict';

  $(function () {
  	$('[data-toggle="tooltip"]').tooltip()
  })
  
  $('.menu-door').on('click', function(){
  	$('#sidebar-wrapper').toggle();
  	$('.glyphicon').toggleClass('glyphicon-chevron-left glyphicon-chevron-right');
  });

}(window.jQuery);