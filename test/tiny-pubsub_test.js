(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery Tiny Pub/Sub', {
    setup: function() {
      var result = this.result = [];
      this.createHandler = function(id) {
        return function() {
          result.push([id].concat([].slice.call(arguments)));
        };
      };
    }
  });

  test('order', function() {
    $.on('order', this.createHandler('order1'));
    $.on('order', this.createHandler('order2'));
    $.on('order.xyz', this.createHandler('order3'));
    $.on('order.abc', this.createHandler('order4'));
    $.emit('order');
    deepEqual(this.result, [
      ['order1'],
      ['order2'],
      ['order3'],
      ['order4']
    ], 'handlers should fire in the order in which they were bound.');
  });

  test('arguments', function() {
    $.on('arguments', this.createHandler('arguments1'));
    $.on('arguments.xyz', this.createHandler('arguments2'));
    $.on('arguments.abc', this.createHandler('arguments3'));
    $.emit('arguments', [null, 'test 1 2 3', undefined, 9]);
    deepEqual(this.result, [
      ['arguments1', null, 'test 1 2 3', undefined, 9],
      ['arguments2', null, 'test 1 2 3', undefined, 9],
      ['arguments3', null, 'test 1 2 3', undefined, 9]
    ], 'handlers should receive all passed arguments.');
  });

  test('namespaces', function() {
    $.on('namespaces', this.createHandler('namespaces1'));
    $.on('namespaces.xyz', this.createHandler('namespaces2'));
    $.on('namespaces.abc', this.createHandler('namespaces3'));
    $.emit('namespaces.xyz', [8, 9]);
    deepEqual(this.result, [
      ['namespaces2', 8, 9]
    ], 'publishing should support jquery event namespaces.');
  });

  test('unsubscribe', function() {
    $.on('unsubscribe', this.createHandler('unsubscribe1'));
    $.on('unsubscribe.xyz', this.createHandler('unsubscribe2'));
    $.on('unsubscribe.abc', this.createHandler('unsubscribe3'));
    $.off('unsubscribe.xyz');
    $.emit('unsubscribe', [8, 9]);
    deepEqual(this.result, [
      ['unsubscribe1', 8, 9],
      ['unsubscribe3', 8, 9]
    ], 'unsubscribing should work.');
  });

}(jQuery));
