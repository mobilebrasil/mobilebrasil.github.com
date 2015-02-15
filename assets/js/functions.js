+ function ($) {
	'use strict';

	$(function () {
	    	$('[data-toggle="tooltip"]').tooltip();
	});
	  
	$('.menu-door').on('click', function(e){
	    	e.preventDefault();
	    	$('#sidebar-wrapper').toggle();
	    	$("section").toggleClass("toggled padding-less");
	    	$('.glyphicon').toggleClass('glyphicon-chevron-left glyphicon-chevron-right');
	});

}(window.jQuery);