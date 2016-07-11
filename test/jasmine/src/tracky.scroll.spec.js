'use strict';

// Describe

require('../../../dist/tracky');
var _tracky = Tracky.default;

var scrollEventKey = 'scroll';

var scrollEventOptions = {
  events: {
    scroll: {
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
        expect(trackyScroll.onStart).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onStop method', function () {
        expect(trackyScroll.onStop).toBeDefined();
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
        expect(trackyScroll.remove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onRemove method', function () {
        expect(trackyScroll.onRemove).toBeDefined();
        expect(trackyScroll.onRemove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public enable method', function () {
        expect(trackyScroll.enable).toBeDefined();
        expect(trackyScroll.enable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public disable method', function () {
        expect(trackyScroll.disable).toBeDefined();
        expect(trackyScroll.disable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public attachClasses method', function () {
        expect(trackyScroll.attachClasses).toBeDefined();
        expect(trackyScroll.attachClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public cleanupClasses method', function () {
        expect(trackyScroll.cleanupClasses).toBeDefined();
        expect(trackyScroll.cleanupClasses).toEqual(jasmine.any(Function));
      }
    );

  }
);


describe(
  'tracky.scroll.js - getNodes', function () {

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
      'should return a callback property with having properties match/unmatch', function () {
        trackyScroll
          ._transformBreakpoints(scrollEventOptions.events.scroll.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.callbacks).toBeDefined();
              expect(bp.callbacks.match).toBeDefined();
              expect(bp.callbacks.unmatch).toBeDefined();
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


  }
);


describe(
  'tracky.scroll.js - _getBpsByClassNames', function () {

    var exampleArray = ['this-is-between-400-and-500', 'tracky-scroll-eq-99pc', 'not-found'];

    it(
      'should return an array or null', function () {
        expect(trackyScroll._getBpsByClassNames([])).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(null)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(false)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames({})).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(NaN)).toEqual(null);
        expect(trackyScroll._getBpsByClassNames(exampleArray)).toEqual(jasmine.any(Array));
        expect(trackyScroll._getBpsByClassNames(exampleArray).length).toEqual(2);
      }
    );

    it(
      'should return an array with objects', function () {
        trackyScroll
          ._getBpsByClassNames(exampleArray)
          .forEach(
            function (bp) {
              expect(bp).toEqual(jasmine.any(Object));
            }
          );
      }
    );

  }
);

