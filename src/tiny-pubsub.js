/*!
 * jQuery Tiny Pub/Sub - v0.6 - 1/10/2011
 * http://benalman.com/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
*/

/*
 * We purposely use an older version of the Tiny Pub/Sub implementation
 * because we want to keep API parity with existing code.
 * Newer versions meant the 'event' object would be passed as the first
 * argument to the subscriber/callback and this meant changing all our
 * EventEmitter code. I decided it was best to avoid that issue and use
 * an older version whose only difference is to strip off the first
 * argument so as to result in a true refactoring where we don't tamper
 * with the interface, just the implementation.
 */

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

    // Add .guid property to function to allow it to be easily unbound. Note
    // that $.guid is new in jQuery 1.4+, and $.event.guid was used before.
    wrapper.guid = fn.guid = fn.guid || ($.guid ? $.guid++ : $.event.guid++);
    args[1] = wrapper;

    o.on.apply(o, args);
  };

  $.each({ 'off': 'off', 'emit': 'trigger' }, function(v, k){
    $[v] = $.proxy(o[k], o);
  });

}(jQuery));