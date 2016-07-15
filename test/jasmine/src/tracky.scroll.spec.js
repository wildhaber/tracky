'use strict';

// Describe

var _tracky = require('../../../index');

var scrollEventKey = 'scroll';

var scrollEventOptions = {
  events: {
    scroll: {
      enable: true,
      breakpoints: [
        0, 50, 200, 500, 2000, {
          css: 'this-is-my-special-class-at-350',
          value: 350
        }, {
          value: '99%'
        }, {
          css: 'this-is-between-400-and-500',
          min: 400,
          max: 500,
          onMatch: function () {
            return 'match';
          },
          onUnmatch: function () {
            return 'unmatch';
          },
          onGreater: function() {
            return 'greater';
          },
          onLower: function() {
            return 'lower';
          }
        }, {
          css: 'mega-element-active',
          min: '40%',
          max: '60%'
        }, {
          min: 60,
          max: '40%'
        },
        NaN,
        null,
        false,
        {some: 'thing'},
        '100%'
        , {
          css: {
            lt: 'extra-class-for-lower-than',
            gt: 'extra-class-for-greater-than',
            eq: 'extra-class-for-equal-to',
            bt: 'extra-class-for-between'
          },
          applyLt: false,
          applyGt: false,
          applyEq: false,
          applyBt: false,
          axis: 'x',
          onMatch: function () {
            return 'match';
          },
          onUnmatch: function () {
            return 'unmatch';
          },
          value: [77, {percent: false}],
          min: [44, {percent: true}],
          max: [66, {percent: true}]
        }
      ]
    }
  }
};

var scrollEventOptionsDisabled = {
  events: {
    scroll: {
      enable: false
    }
  }
};


var trackyDefault = new _tracky('body', scrollEventOptions);
var trackyDefaultNoScroll = new _tracky('body', scrollEventOptionsDisabled);
var trackyScroll = trackyDefault._listeners.filter(
  function (l) {
    return l.key === scrollEventKey;
  }
)[0].instance;


describe(
  'tracky.scroll.js constructor', function () {

    it(
      'scroll instance should be available', function () {
        expect(
          function () {
            return trackyDefault._listeners.filter(
              function (l) {
                return l.key === scrollEventKey;
              }
            )[0].instance;
          }
        ).not.toThrowError();
      }
    );

    it(
      'scroll instance should not be available when enable set to false', function () {

        var instanceType = typeof (trackyDefaultNoScroll._listeners.filter(
          function (l) {
            return l.key === scrollEventKey;
          }
        )[0]).instance;

        expect(instanceType).toEqual('undefined');
      }
    );

    it(
      'should bind the event key as a string', function () {
        expect(trackyScroll._key).toBeDefined();
        expect(trackyScroll._key).toEqual(scrollEventKey);
      }
    );

    it(
      'should bind the parent tracky instance', function () {
        expect(trackyScroll._tracky).toBeDefined();
        // Todo: find a way how to make this check work
        // expect(trackyScroll._tracky).toBe(jasmine.any(_tracky));
      }
    );

    it(
      'should bind the scroll event options', function () {
        expect(trackyScroll._options).toBeDefined();
        expect(trackyScroll._options).toEqual(jasmine.any(Object));
      }
    );

    it(
      'should bind the global event options', function () {
        expect(trackyScroll._globalOptions).toBeDefined();
        expect(trackyScroll._globalOptions).toEqual(jasmine.any(Object));
      }
    );

    it(
      'should bind the enabled flag', function () {
        expect(trackyScroll._enabled).toBeDefined();
        expect(trackyScroll._enabled).toEqual(true);
      }
    );

    it(
      'should transform breakpoints as an array', function () {
        expect(trackyScroll._options.breakpoints).toBeDefined();
        expect(!!(trackyScroll._options.breakpoints instanceof Array)).toEqual(true);
      }
    );

    it(
      'should have classNames extracted and bound', function () {
        expect(trackyScroll._classNames).toBeDefined();
        expect(!!(trackyScroll._classNames instanceof Array)).toEqual(true);

        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-0');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-0');
        expect(trackyScroll._classNames).toContain('tracky-scroll-eq-0');
        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-50');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-50');
        expect(trackyScroll._classNames).toContain('tracky-scroll-eq-50');
        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-200');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-200');
        expect(trackyScroll._classNames).toContain('tracky-scroll-eq-200');
        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-500');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-500');
        expect(trackyScroll._classNames).toContain('tracky-scroll-eq-500');
        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-2000');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-2000');
        expect(trackyScroll._classNames).toContain('tracky-scroll-eq-2000');
        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-350');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-350');
        expect(trackyScroll._classNames).toContain('this-is-my-special-class-at-350');
        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-99pc');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-99pc');
        expect(trackyScroll._classNames).toContain('tracky-scroll-eq-99pc');
        expect(trackyScroll._classNames).toContain('this-is-between-400-and-500');
        expect(trackyScroll._classNames).toContain('mega-element-active');
        expect(trackyScroll._classNames).toContain('tracky-scroll-bt-60-40pc');
        expect(trackyScroll._classNames).toContain('tracky-scroll-lt-100pc');
        expect(trackyScroll._classNames).toContain('tracky-scroll-gt-100pc');
        expect(trackyScroll._classNames).toContain('tracky-scroll-eq-100pc');
        expect(trackyScroll._classNames).toContain('extra-class-for-lower-than');
        expect(trackyScroll._classNames).toContain('extra-class-for-greater-than');
        expect(trackyScroll._classNames).toContain('extra-class-for-equal-to');

      }
    );

    it(
      'should define a public start method', function () {
        expect(trackyScroll.start).toBeDefined();
        expect(trackyScroll.start).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public stop method', function () {
        expect(trackyScroll.stop).toBeDefined();
        expect(trackyScroll.stop).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onStart method', function () {
        expect(trackyScroll.onStart).toBeDefined();
        expect(function() { trackyScroll.onStart() }).not.toThrowError();
        expect(trackyScroll.onStart).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onStop method', function () {
        expect(trackyScroll.onStop).toBeDefined();
        expect(function() { trackyScroll.onStop() }).not.toThrowError();
        expect(trackyScroll.onStop).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public add method', function () {
        expect(trackyScroll.add).toBeDefined();
        expect(trackyScroll.add).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onAdd method', function () {
        expect(trackyScroll.onAdd).toBeDefined();
        expect(trackyScroll.onAdd).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public remove method', function () {
        expect(trackyScroll.remove).toBeDefined();
        //expect(function() { trackyScroll.remove() }).not.toThrowError();
        expect(trackyScroll.remove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onRemove method', function () {
        expect(trackyScroll.onRemove).toBeDefined();
        //expect(function() { trackyScroll.onRemove() }).not.toThrowError();
        expect(trackyScroll.onRemove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public enable method', function () {
        expect(trackyScroll.enable).toBeDefined();
        expect(function() { trackyScroll.enable() }).not.toThrowError();
        expect(trackyScroll.enable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public disable method', function () {
        expect(trackyScroll.disable).toBeDefined();
        //expect(function() { trackyScroll.disable() }).not.toThrowError();
        expect(trackyScroll.disable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public attachClasses method', function () {
        expect(trackyScroll.attachClasses).toBeDefined();
        //expect(function() { trackyScroll.attachClasses() }).not.toThrowError();
        expect(trackyScroll.attachClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public cleanupClasses method', function () {
        expect(trackyScroll.cleanupClasses).toBeDefined();
        //expect(function() { trackyScroll.cleanupClasses() }).not.toThrowError();
        expect(trackyScroll.cleanupClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _listener method', function () {
        expect(trackyScroll._listener).toBeDefined();
        //expect(function() { trackyScroll._listener() }).not.toThrowError();
        expect(trackyScroll._listener).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public bindEvent method', function () {
        expect(trackyScroll.bindEvent).toBeDefined();
        //expect(trackyScroll.bindEvent()).not.toThrowError();
        expect(trackyScroll.bindEvent).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _percentRound method', function () {
        expect(trackyScroll._percentRound).toBeDefined();
        //expect(trackyScroll._percentRound()).not.toThrowError();
        expect(trackyScroll._percentRound).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _getScrollPosition method', function () {
        expect(trackyScroll._getScrollPosition).toBeDefined();
        //expect(trackyScroll._getScrollPosition()).not.toThrowError();
        expect(trackyScroll._getScrollPosition).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public bindBodyEvent method', function () {
        expect(trackyScroll.bindBodyEvent).toBeDefined();
        //expect(trackyScroll.bindBodyEvent()).not.toThrowError();
        expect(trackyScroll.bindBodyEvent).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public unbindBodyEvent method', function () {
        expect(trackyScroll.unbindBodyEvent).toBeDefined();
        //expect(trackyScroll.unbindBodyEvent()).not.toThrowError();
        expect(trackyScroll.unbindBodyEvent).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _isBody method', function () {
        expect(trackyScroll._isBody).toBeDefined();
        //expect(trackyScroll._isBody()).not.toThrowError();
        expect(trackyScroll._isBody).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public bindEvents method', function () {
        expect(trackyScroll.bindEvents).toBeDefined();
        //expect(trackyScroll.bindEvents()).not.toThrowError();
        expect(trackyScroll.bindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public unbindEvents method', function () {
        expect(trackyScroll.unbindEvents).toBeDefined();
        //expect(trackyScroll.unbindEvents()).not.toThrowError();
        expect(trackyScroll.unbindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _buildClassName method', function () {
        expect(trackyScroll._buildClassName).toBeDefined();
        //expect(trackyScroll._buildClassName()).not.toThrowError();
        expect(trackyScroll._buildClassName).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _extractClasses method', function () {
        expect(trackyScroll._extractClasses).toBeDefined();
        //expect(trackyScroll._extractClasses()).not.toThrowError();
        expect(trackyScroll._extractClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public classify method', function () {
        expect(trackyScroll.classify).toBeDefined();
        //expect(trackyScroll.classify()).not.toThrowError();
        expect(trackyScroll.classify).toEqual(jasmine.any(Function));
      }
    );


    it(
      'should define a private _applyCallbacks method', function () {
        expect(trackyScroll._applyCallbacks).toBeDefined();
        //expect(trackyScroll._applyCallbacks()).not.toThrowError();
        expect(trackyScroll._applyCallbacks).toEqual(jasmine.any(Function));
      }
    );


    it(
      'should define a public callbackHandler method', function () {
        expect(trackyScroll.callbackHandler).toBeDefined();
        //expect(trackyScroll.callbackHandler()).not.toThrowError();
        expect(trackyScroll.callbackHandler).toEqual(jasmine.any(Function));
      }
    );

  }
);


describe(
  'tracky.scroll.js - getNodes', function () {

    it(
      'method should be defined', function () {
        expect(trackyScroll.getNodes).toBeDefined();
        expect(trackyScroll.getNodes).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array', function () {
        expect(trackyScroll.getNodes()).toEqual(jasmine.any(Array));
      }
    );

    it(
      'should return nodes from the parent tracky instance', function () {
        expect(trackyScroll.getNodes()).toEqual(trackyDefault._nodes);
      }
    );

  }
);

describe(
  'tracky.scroll.js - _percentRound', function () {

    it(
      'method should be defined', function () {
        expect(trackyScroll._percentRound).toBeDefined();
        expect(trackyScroll._percentRound).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an integer', function () {
        expect(trackyScroll._percentRound(55.66)).toEqual(jasmine.any(Number));
        expect(trackyScroll._percentRound('test')).toEqual(jasmine.any(Number));
        expect(trackyScroll._percentRound('28%')).toEqual(jasmine.any(Number));
      }
    );

    it(
      'should return a rounded percent value', function () {
        expect(trackyScroll._percentRound(55.6666687998797564)).toEqual(56);
        expect(trackyScroll._percentRound(44)).toEqual(44);
        expect(trackyScroll._percentRound(0)).toEqual(0);
        expect(trackyScroll._percentRound(-66.44589)).toEqual(-66);
        expect(trackyScroll._percentRound(-555)).toEqual(-555);
      }
    );


    it(
      'should return 0 on malformed arguments', function () {
        expect(trackyScroll._percentRound(false)).toEqual(0);
        expect(trackyScroll._percentRound(null)).toEqual(0);
        expect(trackyScroll._percentRound({})).toEqual(0);
        expect(trackyScroll._percentRound(true)).toEqual(0);
        expect(trackyScroll._percentRound(NaN)).toEqual(0);
      }
    );

  }
);


describe(
  'tracky.scroll.js - _isBody', function () {

    var goodInput = {nodeName: 'BODY'};
    var malformed1 = null;
    var malformed2 = false;
    var malformed3 = {nonodename: 'haha'};
    var malformed4 = NaN;
    var malformed5 = 'burumm';
    var malformed6 = true;

    it(
      'method should be defined', function () {
        expect(trackyScroll._isBody).toBeDefined();
        expect(trackyScroll._isBody).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return a boolean', function () {
        expect(trackyScroll._isBody(goodInput)).toEqual(jasmine.any(Boolean));
        expect(trackyScroll._isBody(malformed1)).toEqual(jasmine.any(Boolean));
        expect(trackyScroll._isBody(malformed2)).toEqual(jasmine.any(Boolean));
        expect(trackyScroll._isBody(malformed3)).toEqual(jasmine.any(Boolean));
        expect(trackyScroll._isBody(malformed4)).toEqual(jasmine.any(Boolean));
        expect(trackyScroll._isBody(malformed5)).toEqual(jasmine.any(Boolean));
        expect(trackyScroll._isBody(malformed6)).toEqual(jasmine.any(Boolean));
      }
    );

    it(
      'should return true if nodeName equals BODY', function () {
        expect(trackyScroll._isBody(goodInput)).toEqual(true);
      }
    );

    it(
      'should be able to deal with malformed inputs', function () {
        expect(trackyScroll._isBody(malformed1)).toEqual(false);
        expect(trackyScroll._isBody(malformed2)).toEqual(false);
        expect(trackyScroll._isBody(malformed3)).toEqual(false);
        expect(trackyScroll._isBody(malformed4)).toEqual(false);
        expect(trackyScroll._isBody(malformed5)).toEqual(false);
        expect(trackyScroll._isBody(malformed6)).toEqual(false);
      }
    );

  }
);


describe(
  'tracky.scroll.js - _transformValue', function () {

    var goodInput = 44;
    var goodInput2 = '44%';
    var goodInput3 = [44, {percent: true}];
    var goodInput4 = 55.666;
    var goodInput5 = -55;
    var goodInput6 = -55.666;
    var goodInput7 = '-55.666%';
    var malformed1 = null;
    var malformed2 = false;
    var malformed3 = {nonodename: 'haha'};
    var malformed4 = NaN;
    var malformed5 = 'burumm';
    var malformed6 = true;
    var malformed7 = ['44%', {percent: true}];
    var malformed8 = [['44%', {percent: true}], [22, {percent: false}]];

    it(
      'method should be defined', function () {
        expect(trackyScroll._transformValue).toBeDefined();
        expect(trackyScroll._transformValue).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array with length of two on valid inputs', function () {
        expect(trackyScroll._transformValue(goodInput).length).toEqual(2);
        expect(trackyScroll._transformValue(goodInput2).length).toEqual(2);
        expect(trackyScroll._transformValue(goodInput3).length).toEqual(2);
        expect(trackyScroll._transformValue(goodInput4).length).toEqual(2);
        expect(trackyScroll._transformValue(goodInput5).length).toEqual(2);
        expect(trackyScroll._transformValue(goodInput6).length).toEqual(2);
        expect(trackyScroll._transformValue(goodInput7).length).toEqual(2);
      }
    );

    it(
      'should return an integer at index 0 on valid inputs ', function () {

        expect(trackyScroll._transformValue(goodInput)[0]).toEqual(jasmine.any(Number));
        expect(trackyScroll._transformValue(goodInput2)[0]).toEqual(jasmine.any(Number));
        expect(trackyScroll._transformValue(goodInput3)[0]).toEqual(jasmine.any(Number));
        expect(trackyScroll._transformValue(goodInput4)[0]).toEqual(jasmine.any(Number));
        expect(trackyScroll._transformValue(goodInput5)[0]).toEqual(jasmine.any(Number));
        expect(trackyScroll._transformValue(goodInput6)[0]).toEqual(jasmine.any(Number));
        expect(trackyScroll._transformValue(goodInput7)[0]).toEqual(jasmine.any(Number));

        expect(trackyScroll._transformValue(goodInput)[0]).toEqual(44);
        expect(trackyScroll._transformValue(goodInput2)[0]).toEqual(44);
        expect(trackyScroll._transformValue(goodInput3)[0]).toEqual(44);
        expect(trackyScroll._transformValue(goodInput4)[0]).toEqual(55.666);
        expect(trackyScroll._transformValue(goodInput5)[0]).toEqual(-55);
        expect(trackyScroll._transformValue(goodInput6)[0]).toEqual(-55.666);
        expect(trackyScroll._transformValue(goodInput7)[0]).toEqual(-55);

      }
    );

    it(
      'should return null on invalid inputs ', function () {

        expect(trackyScroll._transformValue(malformed1)).toEqual(null);
        expect(trackyScroll._transformValue(malformed2)).toEqual(null);
        expect(trackyScroll._transformValue(malformed3)).toEqual(null);
        expect(trackyScroll._transformValue(malformed4)).toEqual(null);
        expect(trackyScroll._transformValue(malformed5)).toEqual(null);
        expect(trackyScroll._transformValue(malformed6)).toEqual(null);
        expect(trackyScroll._transformValue(malformed7)).toEqual(null);
        expect(trackyScroll._transformValue(malformed8)).toEqual(null);

      }
    );


  }
);


describe(
  'tracky.scroll.js - _transformBreakpoints', function () {

    it(
      'method should be defined', function () {
        expect(trackyScroll._transformBreakpoints).toBeDefined();
        expect(trackyScroll._transformBreakpoints).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array', function () {
        expect(trackyScroll._transformBreakpoints([])).toEqual(jasmine.any(Array));
        expect(trackyScroll._transformBreakpoints(null)).toEqual(jasmine.any(Array));
        expect(trackyScroll._transformBreakpoints(false)).toEqual(jasmine.any(Array));
        expect(trackyScroll._transformBreakpoints({})).toEqual(jasmine.any(Array));
        expect(trackyScroll._transformBreakpoints(NaN)).toEqual(jasmine.any(Array));
        expect(trackyScroll._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)).toEqual(
          jasmine.any(Array)
        );
      }
    );

    it(
      'should return an array with objects', function () {
        trackyScroll
          ._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)
          .forEach(
            function (bp) {
              expect(bp).toEqual(jasmine.any(Object));
            }
          );
      }
    );

    it(
      'should return an array with objects having property css', function () {
        trackyScroll
          ._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.css).toBeDefined();
              expect(bp.css).toEqual(jasmine.any(Object));
              expect(bp.css.lt).toBeDefined();
              expect(bp.css.gt).toBeDefined();
              expect(bp.css.eq).toBeDefined();
              expect(bp.css.bt).toBeDefined();
            }
          );
      }
    );

    it(
      'should return an array with objects having property apply(Lt/Gt/Eq/Bt) as boolean', function () {
        trackyScroll
          ._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.applyLt).toBeDefined();
              expect(bp.applyLt).toEqual(jasmine.any(Boolean));
              expect(bp.applyGt).toBeDefined();
              expect(bp.applyGt).toEqual(jasmine.any(Boolean));
              expect(bp.applyEq).toBeDefined();
              expect(bp.applyEq).toEqual(jasmine.any(Boolean));
              expect(bp.applyBt).toBeDefined();
              expect(bp.applyBt).toEqual(jasmine.any(Boolean));
            }
          );
      }
    );

    it(
      'should return an array with objects having property value/min/max', function () {
        trackyScroll
          ._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.value).toBeDefined();
              expect(bp.min).toBeDefined();
              expect(bp.max).toBeDefined();
            }
          );
      }
    );

    it(
      'should set axis as x or y', function () {
        trackyScroll
          ._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.axis).toBeDefined();
              expect(bp.axis).toEqual(jasmine.any(String));
              expect(bp.axis.length).toEqual(1);
              expect(['x','y'].indexOf(bp.axis)).toBeGreaterThan(-1);
            }
          );
      }
    );

    it(
      'should return a callback property with having properties match/unmatch/lower/greater', function () {
        trackyScroll
          ._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.callbacks).toBeDefined();
              expect(bp.callbacks.match).toBeDefined();
              expect(bp.callbacks.unmatch).toBeDefined();
              expect(bp.callbacks.lower).toBeDefined();
              expect(bp.callbacks.greater).toBeDefined();
            }
          );
      }
    );

    it(
      'should bind onMatch callback property to breakpoint', function () {
        trackyScroll
          ._transformBreakpoints(
            {
              css: 'this-is-between-400-and-500',
              min: 400,
              max: 500,
              onMatch: function () {
                return 'match';
              }
            }
          )
          .forEach(
            function (bp) {
              expect(typeof bp.callbacks.match).toEqual('function');
              expect(bp.callbacks.match()).toEqual('match');
            }
          );
      }
    );

    it(
      'should bind onUnmatch callback property to breakpoint', function () {
        trackyScroll
          ._transformBreakpoints(
            {
              css: 'this-is-between-400-and-500',
              min: 400,
              max: 500,
              onUnmatch: function () {
                return 'unmatch';
              }
            }
          )
          .forEach(
            function (bp) {
              expect(typeof bp.callbacks.unmatch).toEqual('function');
              expect(bp.callbacks.unmatch()).toEqual('unmatch');
            }
          );
      }
    );

    it(
      'should bind onLower callback property to breakpoint', function () {
        trackyScroll
          ._transformBreakpoints(
            {
              css: 'this-is-between-400-and-500',
              min: 400,
              max: 500,
              onLower: function () {
                return 'lower';
              }
            }
          )
          .forEach(
            function (bp) {
              expect(typeof bp.callbacks.lower).toEqual('function');
              expect(bp.callbacks.lower()).toEqual('lower');
            }
          );
      }
    );

    it(
      'should bind onGreater callback property to breakpoint', function () {
        trackyScroll
          ._transformBreakpoints(
            {
              css: 'this-is-between-400-and-500',
              min: 400,
              max: 500,
              onGreater: function () {
                return 'greater';
              }
            }
          )
          .forEach(
            function (bp) {
              expect(typeof bp.callbacks.greater).toEqual('function');
              expect(bp.callbacks.greater()).toEqual('greater');
            }
          );
      }
    );

  }
);


describe(
  'tracky.scroll.js - _getBpsByClassNames', function () {

    var exampleArray = ['this-is-between-400-and-500', 'tracky-scroll-eq-99pc', 'not-found'];

    it(
      'method should be defined', function () {
        expect(trackyScroll._getBpsByClassNames).toBeDefined();
        expect(trackyScroll._getBpsByClassNames).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array or null', function () {
        expect(trackyScroll._getBpsByClassNames([])).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(null)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(false)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames({})).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(NaN)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(exampleArray, ['eq','bt'])).toEqual(jasmine.any(Array));
        expect(trackyScroll._getBpsByClassNames(exampleArray, ['eq','bt']).length).toEqual(2);
      }
    );

    it(
      'should return an array with objects', function () {
        trackyScroll
          ._getBpsByClassNames(exampleArray,['eq','bt'])
          .forEach(
            function (bp) {
              expect(bp).toEqual(jasmine.any(Object));
            }
          );
      }
    );

    it(
      'should return an array or null - findIn parameter', function () {
        expect(trackyScroll._getBpsByClassNames(exampleArray, null)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(exampleArray, ['something'])).toEqual(jasmine.any(Array));
        expect(trackyScroll._getBpsByClassNames(exampleArray, 'eq')).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(exampleArray, {})).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(exampleArray, NaN)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(exampleArray, ['eq', 'lt', 'gt', 'bt'])).toEqual(jasmine.any(Array));
        expect(trackyScroll._getBpsByClassNames(exampleArray, ['eq', 'lt', 'gt', 'bt']).length).toEqual(2);
      }
    );

  }
);

