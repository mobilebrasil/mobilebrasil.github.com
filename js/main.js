$(document).ready(function(){
	
	"use strict";
	
	// Main slider animation with Flexslider
	$('#slider .flexslider').flexslider({
		controlNav: false,
		animationSpeed: 1000,
		start: function(slider) { $(slider).removeClass('loading'); }
	});
	
	// Services carousel animation with Flexslider
	$('#main .services .flexslider').flexslider({
		directionNav: false,
		animation: "slide",
		animationLoop: false,
		slideshow: false,
		start: function(slider) { $(slider).removeClass('loading'); }	
	});
	
	// jQuery tooltips
	$('#main .contact .social li a').tooltip({placement: 'bottom'});
	
	// Portofolio filter with jQuery Isotope
	$(window).load(function(){
        var $container          = $('#main .portofolio .portofolio-items');
        var $filter             = $('#main .portofolio .portofolio-filter');
        
		// Initialize
        $container.isotope({
            filter              : '*',
            layoutMode          : 'fitRows',
            animationOptions    : {duration: 400}
        });
        
        // Trigger item lists filter when link clicked
        $filter.find('a').click(function() {
            var selector = $(this).attr('data-filter');
            $filter.find('a').removeClass('active');
            $(this).addClass('active');
            $container.isotope({ 
                filter             : selector,
                animationOptions   : {animationDuration  : 400, queue : false}
            });
            return false;
        });
    });
	
	
	/* Responsive main menu */
	var $navMenu	= $("#header .nav-menu");
	$("<select />").addClass('responsive').appendTo($navMenu);
	$("<option />", {
		"selected": "selected",
		"value"   : "#",
		"text"    : "Please select one option..."
	}).appendTo($navMenu.find('select'));
	
	// Dropdown menu list value
	$navMenu.find('ul li a').each(function() {
		var el = $(this);
		$("<option />", {
			"value"   : el.attr("href"),
			"text"    : el.text()
		}).appendTo($navMenu.find('select'));
	});
	
	// Make the drop-down work
	$navMenu.find('select').change(function() { window.location = $(this).find("option:selected").val(); });
	/* End responsive main menu */
	
	// jQuery figure hover effect
	$('figure.figure-hover').hover(
		function() { $(this).children("a").children("div").fadeIn(100); },
		function() { $(this).children("a").children("div").fadeOut(100); }
	);
	
	// jQuery smooth scrolling
	$('#header .nav-menu ul li a').bind('click', function(event) {
		var $anchor = $(this);		
		$('html, body').stop().animate({
			scrollTop: parseInt($($anchor.attr('href')).offset().top - 80, 0)
		}, 2000,'easeInOutExpo');
		event.preventDefault();
	});
	
	
	/* Contact us process */
	$("#contact-form").submit(function() {
		var submitData	= $(this).serialize();
		var $name		= $(this).find("input[name='name']");
		var $email		= $(this).find("input[name='email']");
		var $subject	= $(this).find("input[name='subject']");
		var $message	= $(this).find("textarea[name='message']");
		var $datastatus	= $(this).find(".data-status");
		var $submit		= $(this).find("input[name='submit']");
		
		$name.attr('disabled','disabled');
		$email.attr('disabled','disabled');
		$subject.attr('disabled','disabled');
		$message.attr('disabled','disabled');
		$datastatus.show().html('<div class="alert alert-info"><strong>Loading...</strong></div>');
		
		$.ajax({ // Send an offer process with AJAX
			type: "POST",
			url: "contact.php",
			data: submitData + "&action=add",
			dataType: "html",
			success: function(msg){
				if(parseInt(msg, 0) !== 0) {
					var msg_split = msg.split("|");
					if(msg_split[0] === "success") {
						$name.val('').removeAttr('disabled');
						$email.val('').removeAttr('disabled');
						$subject.val('').removeAttr('disabled');
						$message.val('').removeAttr('disabled');
						$submit.removeAttr('disabled');
						$datastatus.html(msg_split[1]).fadeIn();
					} else {
						$name.removeAttr('disabled');
						$email.removeAttr('disabled');
						$subject.removeAttr('disabled');
						$message.removeAttr('disabled');
						$submit.removeAttr('disabled');
						$datastatus.html(msg_split[1]).fadeIn();
					}
				}
			}
		});
		return false;
	});
	/* End contact us process */
	
	
	// jQuery placeholder for IE
	$("input, textarea").placeholder();
	
	
	/* Load full post with jQuery */
	$("#main .blog .btn-more").on('click', function(e) { // Readmore button clicked
		var $btn	= $(this);
		var output	= "";
		var title	= $btn.parents('.item').find('.name').text();
		var content	= $btn.parents('.item').find('.full-content').html();
		var desc	= $btn.parents('.item').find('.desc span').text();
		
		output	+= '<div class="row more-content">';
		output	+= '<div class="span12 item single">';
		output	+= '<div class="name">';
		output	+= title;
		output	+= '</div>';
		output	+= content;
		output	+= '<div class="desc">';
		output	+= '<span>' + desc + '</span>';
		output	+= '<a href="#" class="btn-close">Close</a>';
		output	+= '</div>';
		output	+= '</div>';
		output	+= '</div>';
		
		$btn.css('background-image', 'url(images/loading-post.gif)');
		
		if(content !== undefined && content !== "") {
			$btn.parents('.blog').find('.more-content').each(function() { $(this).hide(); });
			$btn.parents('.row').after(output).next().hide().slideDown(1000, function() { $btn.css('background-image', 'url(images/btn-more-icon.png)'); });
		} else { 
			$btn.css('background-image', 'url(images/btn-more-icon.png)');
		}
		
		$btn.parents('.blog').find('.btn-close').on('click', function(e) { // Close button clicked
			$(this).parents('.row').slideUp(1000);
			e.preventDefault();
		});
		
		e.preventDefault();
	});
	/* End load full post with jQuery */
	
	
	/* Customizer */
	$("#customize h5").click(function() {
		$(this).next().slideToggle();
	});
	
	$("#customize .colors-panel a").click(function(e) {
		var $color = $(this).attr('class');
		$('head').append('<link rel="stylesheet" type="text/css" href="css/customizer/'+ $color +'/color.css">');
		$('#main .services .item img').each(function(index, element) {
            $(element).attr('src', 'images/services/' + $color + '/' + element.src.substr(element.src.lastIndexOf('/')));
        });
		e.preventDefault();
	});
	
	$("#customize .backgrounds-panel a").click(function(e) {
		var $number = $(this).attr('class');
		$("body").css('background', 'url(images/patterns/' + $number + '.png) repeat');
		e.preventDefault();
	});
	/* End customizer */

});