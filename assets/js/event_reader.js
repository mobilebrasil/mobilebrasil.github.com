+ function ($) {
	'use strict';

	$(document).ready(function () {

		$.getJSON( "./event.json", function( data ) {

			console.log(data);
			
		});
	});

}(window.jQuery);