/*
Theme Name: 
Version: 
Author: 
Author URI: 
Description: 
*/
/*	IE 10 Fix*/

(function ($) {
	'use strict';
	
	jQuery(document).ready(function () {

		// menu js start
		$.fn.menumaker = function (options) {
	        var flexmenu = $(this), settings = $.extend({
	                format: 'dropdown',
	                sticky: false
	            }, options);
	        return this.each(function () {
	           
	            flexmenu.find('li ul').parent().addClass('menu-item-has-children');
	            var subToggle;
	            subToggle = function () {
	                flexmenu.find('.menu-item-has-children').prepend('<span class="submenu-button"></span>');
	                //flexmenu.find('.menu-item-has-children>a').append('<i class="fa fa-angle-down"></i>');
	                flexmenu.find('.submenu-button').on('click', function () {
	                    $(this).toggleClass('submenu-opened');
	                    if ($(this).siblings('ul').hasClass('open')) {
	                        $(this).siblings('ul').removeClass('open').slideToggle();
	                    } else {
	                        $(this).siblings('ul').addClass('open').slideToggle();
	                    }
	                });
	            };
	            if (settings.format === 'multitoggle')
	                subToggle();
	            else
	                flexmenu.addClass('dropdown');
	            if (settings.sticky === true)
	                flexmenu.css('position', 'fixed');
	            var resizeFix;
	            resizeFix = function () {
	                var mediasize = 785;
	                if ($(window).width() > mediasize) {
	                    flexmenu.find('ul').show();
	                }
	                if ($(window).width() <= mediasize) {
	                    flexmenu.find('ul').hide().removeClass('open');
	                }
	            };
	            resizeFix();
	            return $(window).on('resize', resizeFix);
	        });
	    };

	    $('#flexmenu').menumaker({ format: 'multitoggle' });
	    // menu js end

	    // Search bar open
		$('a.search_icon').on('click', function (e) {
		  	e.preventDefault();
		  	$('.search_overlay').toggleClass('active');
		});
		$('.closebtn').on('click', function (e) {
		  	e.preventDefault();
		  	$('.search_overlay').removeClass('active');
		});
		$(".keyword").typed({
            strings: ['Type to search..'],
		    typeSpeed: 20,
		    backSpeed: 0,
		    attr: 'placeholder',
		    bindInputFocusEvents: true,
		    loop: true
        });

		// Overlay Navigation Start
		$('.mobile-btn').on('click', function (e) {
			e.preventDefault();
			$('.overlaynav').toggleClass('popup');
		});

		$('.overlaynavclose').click(function(e){
			e.preventDefault();
		    $('.overlaynav').removeClass('popup');;
		});

		$('#overlaymenu ul li').has('>ul').addClass('menu-item-has-children');
		$('#overlaymenu ul li.menu-item-has-children>a').append('<i class="fa fa-angle-down"></i>');
		$('#overlaymenu ul li.menu-item-has-children>a>i').on("click", function(e){
		    $(this).parent().next().slideToggle();
	    	e.stopPropagation();
	    	e.preventDefault();
		});

		// Side Navigation Start
		$('.sidenavopen').click(function(e){
			e.preventDefault();
			$('.navigation').css("left", "0px");
		});

		$('.sidenavclose').click(function(e){
			e.preventDefault();
		    $('.navigation').css("left", "-250px");
		});
 	});
	
	var alterClass = function() {
        var ww = document.body.clientWidth;
        if (ww < 600) {
            $('.side_menu .navigation').css("left", "-250px");
        } else if (ww >= 601) {
            $('.side_menu .navigation').css("left", "0px");
        };
    };
    $(window).resize(function(){
        alterClass();
    });
        //Fire it when the page first loads:
    alterClass();
	
})(jQuery);
