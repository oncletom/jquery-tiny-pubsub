/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function($) {

  var o = $({});

  $.subscribe = function() {
    var fn = arguments[1];

    function wrapper() {
      return fn.apply(this, Array.prototype.slice.call(arguments, 1));
    }

    wrapper.guid = fn.guid = fn.guid || ($.guid ? $.guid++ : $.event.guid++);
    arguments[1] = wrapper;

    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));