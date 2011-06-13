/*
 * jQuery Image Gallery Plugin JS Example 1.3.1
 * https://github.com/blueimp/jQuery-Image-Gallery
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://creativecommons.org/licenses/MIT/
 */

/*jslint unparam: true, regexp: true */
/*global $ */

$(function () {
    'use strict';

    // Initialize the Image Gallery plugin:
    $('a[rel="gallery"]').imagegallery();

    // Initialize the theme switcher:
    $('#theme-switcher').change(function () {
        var theme = $('#theme');
        theme.prop(
            'href',
            theme.prop('href').replace(
                /[\w\-]+\/jquery-ui.css/,
                $(this).val() + '/jquery-ui.css'
            )
        );
    });
    
    // Create a buttonset out of the checkbox options:
    $('#buttonset').buttonset();
    
    // Listen to options changes:
    $('#buttonset input, #effect').change(function () {
        $('a[rel="gallery"]').imagegallery('destroy');
        $('a[rel="gallery"]').imagegallery({
            show: $('#effect').val(),
            hide: $('#effect').val(),
            fullscreen: $('#option-fullscreen').is(':checked'),
            slideshow: $('#option-slideshow').is(':checked') && 5000
        });
    });

    // Load images via flickr for demonstration purposes:
    $.ajax({
        url: 'http://api.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
            api_key: '7617adae70159d09ba78cfec73c13be3'
        },
	    dataType: 'jsonp',
        jsonp: 'jsoncallback',
	    success: function (data) {
            $.each(data.photos.photo, function (index, photo) {
                var url = 'http://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret;
                $('<a rel="gallery"></a>')
                    .append($('<img>').prop('src', url + '_s.jpg'))
                    .prop('href', url + '_b.jpg')
                    .prop('title', photo.title)
                    .appendTo('#demo');
            });
        }
    });

});