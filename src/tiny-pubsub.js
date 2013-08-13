/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function($, o) {

  o = $({});

  $.subscribe = function() {
    var fn = arguments[1];

    function wrapper() {
      return fn.apply(this, Array.prototype.slice.call(arguments, 1));
    }

    wrapper.guid = fn.guid = fn.guid || ($.guid ? $.guid++ : $.event.guid++);
    arguments[1] = wrapper;

    o.on.apply(o, arguments);
  };

  $.each({ 'unsubscribe': 'off', 'publish': 'trigger' }, function(v, k){
    $[v] = $.proxy(o[k], o);
  });

}(jQuery));