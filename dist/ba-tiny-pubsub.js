/*! Tiny Pub/Sub - v0.7.0 - 2013-08-14
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
(function($, o) {
  "use strict";

  o = $({});

  $.on = function() {
    var context = this;
    var args = arguments;
    var fn = args[1];

    function wrapper() {
      return fn.apply(context, Array.prototype.slice.call(arguments, 1));
    }

    wrapper.guid = fn.guid = fn.guid || ($.guid ? $.guid++ : $.event.guid++);
    args[1] = wrapper;

    o.on.apply(o, args);
  };

  $.each({ 'off': 'off', 'emit': 'trigger' }, function(v, k){
    $[v] = $.proxy(o[k], o);
  });

}(jQuery));