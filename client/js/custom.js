(function (jQuery) {
	'use strict';
	jQuery(document).ready(function () {
	    
        // Pageloader 
        $(".oculoader").delay(5000).addClass('loaded');
        
        

        // Slider 1 (page:1&2)
        var interleaveOffset = 0.5;
        var swiper = new Swiper('.slide_1 .swiper-container', {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 1000,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          on: {
            progress: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slider_item").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }      
            },
            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function(speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slider_item").style.transition =
                  speed + "ms";
              }
            }
          },
        });


        // Slider 2 (page:3&4)
        var interleaveOffset = 0.5;
        var swiper = new Swiper('.slide_2 .swiper-container', {
          slidesPerView: 1,
          spaceBetween: 10,
          autoplay: true,
          loop: true,
          speed: 1000,
          watchSlidesProgress: true,
          mousewheel: true,
          keyboard: true,
          scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
            draggable: true,
          },
          on: {
            progress: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slider_item").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }      
            },
            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function(speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slider_item").style.transition =
                  speed + "ms";
              }
            }
          },
          breakpoints: {
            // when window width is >= 991px
            991: {
              slidesPerView: 3,
              spaceBetween: 10,
            }
          },
        });


        // Slider 3 (page:5)
        var interleaveOffset = 0.5;
        var swiper = new Swiper('.slide_3 .swiper-container', {
          slidesPerView: 1,
          grabCursor: true,
          spaceBetween: 0,
          loop: true,
          speed: 1000,
          watchSlidesProgress: true,
          mousewheel: true,
          keyboard: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          on: {
            progress: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slider_item").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }      
            },
            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function(speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slider_item").style.transition =
                  speed + "ms";
              }
            }
          }
        });    

        // Slider Popup Image
        $('.fancyswiper').fancybox({
          arrows: true,
          animationEffect: [
            //"false",            - disable
            //"fade",
            //"slide",
            //"circular",
            //"tube",
            "zoom-in-out",
            //"rotate"
          ],
          transitionEffect: [
            //"false",            - disable
            //"fade",
            //"slide",
            //"circular",
            //"tube",
            "zoom-in-out",
            //"rotate"
          ],
          buttons: [
            "zoom",
            //"share",
            //"slideShow",
            "fullScreen",
            //"download",
            //"thumbs",
            "close"
          ],
          infobar: false,
        });

        // portfolio-carousel (page:portfolio single 1)
        var interleaveOffset = 0.5;
        var swiper = new Swiper('.portfolio-carousel .swiper-container', {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 1000,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          on: {
            progress: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slider_item").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }      
            },
            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function(speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slider_item").style.transition =
                  speed + "ms";
              }
            }
          },
        });

        // blog-carousel (page:blog single 1)
        var interleaveOffset = 0.5;
        var swiper = new Swiper('.blog-carousel .swiper-container', {
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          speed: 1000,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          on: {
            progress: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slider_item").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }      
            },
            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function(speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slider_item").style.transition =
                  speed + "ms";
              }
            }
          },
        });

       
        // team-carousel (page:about us 3)
        var interleaveOffset = 0.5;
        var swiper = new Swiper('.team-carousel .swiper-container', {
          slidesPerView: 4,
          spaceBetween: 30,
          autoplay: true,
          loop: true,
          speed: 1000,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          on: {
            progress: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slider_item").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }      
            },
            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function(speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slider_item").style.transition =
                  speed + "ms";
              }
            }
          },
        });


        // testimonial-carousel (page:elements)
        var interleaveOffset = 0.5;
        var swiper = new Swiper('.testimonial-carousel .swiper-container', {
          slidesPerView: 1,
          spaceBetween: 0,
          autoplay: true,
          loop: true,
          speed: 1000,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
          },
          on: {
            progress: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                var slideProgress = swiper.slides[i].progress;
                var innerOffset = interleaveOffset;
                var innerTranslate = slideProgress * innerOffset;
                swiper.slides[i].querySelector(".slider_item").style.transform =
                  "translate3d(" + innerTranslate + "px, 0, 0)";
              }      
            },
            touchStart: function() {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = "";
              }
            },
            setTransition: function(speed) {
              var swiper = this;
              for (var i = 0; i < swiper.slides.length; i++) {
                swiper.slides[i].style.transition = speed + "ms";
                swiper.slides[i].querySelector(".slider_item").style.transition =
                  speed + "ms";
              }
            }
          },
        });      

        
        // Portfolio Popup Image
        $('.fancyportfolio').fancybox({
          arrows: true,
          animationEffect: [
            //"false",            - disable
            //"fade",
            //"slide",
            //"circular",
            //"tube",
            //"zoom-in-out",
            "rotate"
          ],
          transitionEffect: [
            //"false",            - disable
            //"fade",
            //"slide",
            "circular",
            //"tube",
            //"zoom-in-out",
            //"rotate"
          ],
          buttons: [
            "zoom",
            //"share",
            //"slideShow",
            "fullScreen",
            //"download",
            //"thumbs",
            "close"
          ],
          infobar: false,
        });

        // Video Popup
        $('.fancybox-media').fancybox({
          arrows: true,
          animationEffect: [
            //"false",            - disable
            //"fade",
            //"slide",
            //"circular",
            //"tube",
            //"zoom-in-out",
            "rotate"
          ],
          transitionEffect: [
            //"false",            - disable
            //"fade",
            //"slide",
            "circular",
            //"tube",
            //"zoom-in-out",
            //"rotate"
          ],
          buttons: [
            "zoom",
            //"share",
            //"slideShow",
            "fullScreen",
            //"download",
            //"thumbs",
            "close"
          ],
          infobar: false,
        });


    });
})(jQuery);