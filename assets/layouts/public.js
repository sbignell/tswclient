/* global app:true */
/* exported app */

var app; //the main declaration

(function() {
  'use strict';

  $(document).ready(function() {
    //active (selected) navigation elements
    $('.nav [href="'+ window.location.pathname +'"]').closest('li').toggleClass('active');

    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader('x-csrf-token', $.cookie('_csrfToken'));
      }
    });

  });
}());
