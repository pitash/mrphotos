(function (jQuery) {
	'use strict';
	jQuery(document).ready(function () {
        
        
        var $grid = $('.grid').isotope({
          itemSelector: '.grid-item', 
          percentPosition: true,
          //layoutMode: 'fitRows',
          transformsEnabled: true,
          transitionDuration: "700ms",
          resize: true,
          fitWidth: true,
          masonry: {
            columnWidth: '.grid-sizer'
          }
        });
        
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });
        
        var iso = $grid.data('isotope');
        var $filterCount = $('.filter-count');

        // bind filter button click
        $('.filters-button-group .button').on( 'click', function() {
            var filterValue = $( this ).attr('data-filter');
            // use filterFn if matches value
            $grid.isotope({ filter: filterValue });
            updateFilterCount();
        });

        function updateFilterCount() {
            $filterCount.text( iso.filteredItems.length);
        }
        updateFilterCount();

        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
        });


    });
})(jQuery);