'use strict';

// Describe

require('../../../dist/tracky');
var _tracky = Tracky.default;

var eventKey = 'edge';

var eventOptions = {
  events: {
    edge: {
      breakpoints: [
        50, [18, 55, 66, 77], {
          css: {
            top: 'edge-tracker-top',
            right: 'edge-tracker-right',
            bottom: 'edge-tracker-bottom',
            left: 'edge-tracker-left',
            topRight: 'edge-tracker-top-right',
            topLeft: 'edge-tracker-top-left',
            bottomRight: 'edge-tracker-bottom-right',
            bottomLeft: 'edge-tracker-bottom-left',
          },
          value: '15%',
          onMatch: function () {
            return 'match';
          },
          onUnmatch: function () {
            return 'mismatch';
          },
          onMatchTop: function () {
            return 'match-top';
          },
          onMatchRight: function () {
            return 'match-right';
          },
          onMatchBottom: function () {
            return 'match-bottom';
          },
          onMatchLeft: function () {
            return 'match-left';
          },
          onMatchTopRight: function () {
            return 'match-top-right';
          },
          onMatchTopLeft: function () {
            return 'match-top-left';
          },
          onMatchBottomRight: function () {
            return 'match-bottom-right';
          },
          onMatchBottomLeft: function () {
            return 'match-bottom-left';
          },
          onUnmatchTop: function () {
            return 'un-match-top';
          },
          onUnmatchRight: function () {
            return 'un-match-right';
          },
          onUnmatchBottom: function () {
            return 'un-match-bottom';
          },
          onUnmatchLeft: function () {
            return 'un-match-left';
          },
          onUnmatchTopRight: function () {
            return 'un-match-top-right';
          },
          onUnmatchTopLeft: function () {
            return 'un-match-top-left';
          },
          onUnmatchBottomRight: function () {
            return 'un-match-bottom-right';
          },
          onUnmatchBottomLeft: function () {
            return 'un-match-bottom-left';
          }
        }, {
          value: [
            '15%',
            '88%',
            45,
            66
          ]
        }, {
          value: {
            top: 44,
            right: 88,
            bottom: '66%',
            left: 99,
          }
        }, {
          css: 'hit-any-edge',
          value: [14, 66]
        }, {
          min: 60,
          max: '40%'
        }
      ]
    }
  }
};

var eventOptionsDisabled = {
  events: {
    edge: {
      enable: false
    }
  }
};


var trackyDefault = new _tracky('body', eventOptions);
var trackyDefaultNoEdge = new _tracky('body', eventOptionsDisabled);
var trackyEdge = trackyDefault._listeners.filter(
  function (l) {
    return l.key === eventKey;
  }
)[0].instance;


describe(
  'tracky.edge.js constructor', function () {

    it(
      'should provide an edge instance', function () {
        expect(
          function () {
            return trackyDefault._listeners.filter(
              function (l) {
                return l.key === eventKey;
              }
            )[0].instance;
          }
        ).not.toThrowError();
      }
    );

    it(
      'should not provide an edge instance when enable is set as false', function () {

        var instanceType = typeof (trackyDefaultNoEdge._listeners.filter(
          function (l) {
            return l.key === eventKey;
          }
        )[0]).instance;

        expect(instanceType).toEqual('undefined');
      }
    );

    it(
      'should bind the event key as a string', function () {
        expect(trackyEdge._key).toBeDefined();
        expect(trackyEdge._key).toEqual(eventKey);
      }
    );

    it(
      'should bind the parent tracky instance', function () {
        expect(trackyEdge._tracky).toBeDefined();
        // Todo: find a way how to make this check work
        // expect(trackyEdge._tracky).toBe(jasmine.any(_tracky));
      }
    );

    it(
      'should bind the scroll event options', function () {
        expect(trackyEdge._options).toBeDefined();
        expect(trackyEdge._options).toEqual(jasmine.any(Object));
      }
    );

    it(
      'should bind the global event options', function () {
        expect(trackyEdge._globalOptions).toBeDefined();
        expect(trackyEdge._globalOptions).toEqual(jasmine.any(Object));
      }
    );

    it(
      'should bind the enabled flag', function () {
        expect(trackyEdge._enabled).toBeDefined();
        expect(trackyEdge._enabled).toEqual(true);
      }
    );

    it(
      'should transform breakpoints as an array', function () {
        expect(trackyEdge._options.breakpoints).toBeDefined();
        expect(!!(trackyEdge._options.breakpoints instanceof Array)).toEqual(true);
      }
    );

    it(
      'should have classNames extracted and bound', function () {
        expect(trackyEdge._classNames).toBeDefined();
        expect(!!(trackyEdge._classNames instanceof Array)).toEqual(true);

        expect(trackyEdge._classNames).toContain('tracky-edge-right-55');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-66');
        expect(trackyEdge._classNames).toContain('tracky-edge-left-77');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-right-18-55');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-left-18-77');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-left-66-77');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-right-66-55');
        expect(trackyEdge._classNames).toContain('edge-tracker-top');
        expect(trackyEdge._classNames).toContain('edge-tracker-right');
        expect(trackyEdge._classNames).toContain('edge-tracker-bottom');
        expect(trackyEdge._classNames).toContain('edge-tracker-left');
        expect(trackyEdge._classNames).toContain('edge-tracker-top-right');
        expect(trackyEdge._classNames).toContain('edge-tracker-top-left');
        expect(trackyEdge._classNames).toContain('edge-tracker-bottom-left');
        expect(trackyEdge._classNames).toContain('edge-tracker-bottom-right');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-15pc');
        expect(trackyEdge._classNames).toContain('tracky-edge-right-88pc');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-45');
        expect(trackyEdge._classNames).toContain('tracky-edge-left-66');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-right-15pc-88pc');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-left-15pc-66');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-left-45-66');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-right-45-88pc');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-44');
        expect(trackyEdge._classNames).toContain('tracky-edge-right-88');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-66pc');
        expect(trackyEdge._classNames).toContain('tracky-edge-left-99');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-right-44-88');
        expect(trackyEdge._classNames).toContain('tracky-edge-top-left-44-99');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-left-66pc-99');
        expect(trackyEdge._classNames).toContain('tracky-edge-bottom-right-66pc-88');
        expect(trackyEdge._classNames).toContain('hit-any-edge');

      }
    );

    it(
      'should define a public start method', function () {
        expect(trackyEdge.start).toBeDefined();
        expect(trackyEdge.start).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public stop method', function () {
        expect(trackyEdge.stop).toBeDefined();
        expect(trackyEdge.stop).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onStart method', function () {
        expect(trackyEdge.onStart).toBeDefined();
        expect(trackyEdge.onStart).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onStop method', function () {
        expect(trackyEdge.onStop).toBeDefined();
        expect(trackyEdge.onStop).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public add method', function () {
        expect(trackyEdge.add).toBeDefined();
        expect(trackyEdge.add).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onAdd method', function () {
        expect(trackyEdge.onAdd).toBeDefined();
        expect(trackyEdge.onAdd).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public remove method', function () {
        expect(trackyEdge.remove).toBeDefined();
        expect(trackyEdge.remove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public onRemove method', function () {
        expect(trackyEdge.onRemove).toBeDefined();
        expect(trackyEdge.onRemove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public enable method', function () {
        expect(trackyEdge.enable).toBeDefined();
        expect(trackyEdge.enable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public disable method', function () {
        expect(trackyEdge.disable).toBeDefined();
        expect(trackyEdge.disable).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public attachClasses method', function () {
        expect(trackyEdge.attachClasses).toBeDefined();
        expect(trackyEdge.attachClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public cleanupClasses method', function () {
        expect(trackyEdge.cleanupClasses).toBeDefined();
        expect(trackyEdge.cleanupClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _listener method', function () {
        expect(trackyEdge._listener).toBeDefined();
        expect(trackyEdge._listener).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private bindEvent method', function () {
        expect(trackyEdge.bindEvent).toBeDefined();
        expect(trackyEdge.bindEvent).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _percentRound method', function () {
        expect(trackyEdge._percentRound).toBeDefined();
        expect(trackyEdge._percentRound).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _getMousePosition method', function () {
        expect(trackyEdge._getMousePosition).toBeDefined();
        expect(trackyEdge._getMousePosition).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public bindEvents method', function () {
        expect(trackyEdge.bindEvents).toBeDefined();
        expect(trackyEdge.bindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public unbindEvents method', function () {
        expect(trackyEdge.unbindEvents).toBeDefined();
        expect(trackyEdge.unbindEvents).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _buildClassName method', function () {
        expect(trackyEdge._buildClassName).toBeDefined();
        expect(trackyEdge._buildClassName).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a private _extractClasses method', function () {
        expect(trackyEdge._extractClasses).toBeDefined();
        expect(trackyEdge._extractClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should define a public classify method', function () {
        expect(trackyEdge.classify).toBeDefined();
        expect(trackyEdge.classify).toEqual(jasmine.any(Function));
      }
    );


    it(
      'should define a private _applyCallbacks method', function () {
        expect(trackyEdge._applyCallbacks).toBeDefined();
        expect(trackyEdge._applyCallbacks).toEqual(jasmine.any(Function));
      }
    );


    it(
      'should define a public callbackHandler method', function () {
        expect(trackyEdge.callbackHandler).toBeDefined();
        expect(trackyEdge.callbackHandler).toEqual(jasmine.any(Function));
      }
    );

  }
);


describe(
  'tracky.edge.js - getNodes', function () {

    it(
      'method should be defined', function () {
        expect(trackyEdge.getNodes).toBeDefined();
        expect(trackyEdge.getNodes).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array', function () {
        expect(trackyEdge.getNodes()).toEqual(jasmine.any(Array));
      }
    );

    it(
      'should return nodes from the parent tracky instance', function () {
        expect(trackyEdge.getNodes()).toEqual(trackyDefault._nodes);
      }
    );

  }
);

describe(
  'tracky.edge.js - _percentRound', function () {

    it(
      'method should be defined', function () {
        expect(trackyEdge._percentRound).toBeDefined();
        expect(trackyEdge._percentRound).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an integer', function () {
        expect(trackyEdge._percentRound(55.66)).toEqual(jasmine.any(Number));
        expect(trackyEdge._percentRound('test')).toEqual(jasmine.any(Number));
        expect(trackyEdge._percentRound('28%')).toEqual(jasmine.any(Number));
      }
    );

    it(
      'should return a rounded percent value', function () {
        expect(trackyEdge._percentRound(55.6666687998797564)).toEqual(56);
        expect(trackyEdge._percentRound(44)).toEqual(44);
        expect(trackyEdge._percentRound(0)).toEqual(0);
        expect(trackyEdge._percentRound(-66.44589)).toEqual(-66);
        expect(trackyEdge._percentRound(-555)).toEqual(-555);
      }
    );


    it(
      'should return 0 on malformed arguments', function () {
        expect(trackyEdge._percentRound(false)).toEqual(0);
        expect(trackyEdge._percentRound(null)).toEqual(0);
        expect(trackyEdge._percentRound({})).toEqual(0);
        expect(trackyEdge._percentRound(true)).toEqual(0);
        expect(trackyEdge._percentRound(NaN)).toEqual(0);
      }
    );

  }
);

describe(
  'tracky.edge.js - _transformValue', function () {

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
        expect(trackyEdge._transformValue).toBeDefined();
        expect(trackyEdge._transformValue).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array with length of two on valid inputs', function () {
        expect(trackyEdge._transformValue(goodInput).length).toEqual(2);
        expect(trackyEdge._transformValue(goodInput2).length).toEqual(2);
        expect(trackyEdge._transformValue(goodInput3).length).toEqual(2);
        expect(trackyEdge._transformValue(goodInput4).length).toEqual(2);
        expect(trackyEdge._transformValue(goodInput5).length).toEqual(2);
        expect(trackyEdge._transformValue(goodInput6).length).toEqual(2);
        expect(trackyEdge._transformValue(goodInput7).length).toEqual(2);
      }
    );

    it(
      'should return an integer at index 0 on valid inputs ', function () {

        expect(trackyEdge._transformValue(goodInput)[0]).toEqual(jasmine.any(Number));
        expect(trackyEdge._transformValue(goodInput2)[0]).toEqual(jasmine.any(Number));
        expect(trackyEdge._transformValue(goodInput3)[0]).toEqual(jasmine.any(Number));
        expect(trackyEdge._transformValue(goodInput4)[0]).toEqual(jasmine.any(Number));
        expect(trackyEdge._transformValue(goodInput5)[0]).toEqual(jasmine.any(Number));
        expect(trackyEdge._transformValue(goodInput6)[0]).toEqual(jasmine.any(Number));
        expect(trackyEdge._transformValue(goodInput7)[0]).toEqual(jasmine.any(Number));

        expect(trackyEdge._transformValue(goodInput)[0]).toEqual(44);
        expect(trackyEdge._transformValue(goodInput2)[0]).toEqual(44);
        expect(trackyEdge._transformValue(goodInput3)[0]).toEqual(44);
        expect(trackyEdge._transformValue(goodInput4)[0]).toEqual(55.666);
        expect(trackyEdge._transformValue(goodInput5)[0]).toEqual(-55);
        expect(trackyEdge._transformValue(goodInput6)[0]).toEqual(-55.666);
        expect(trackyEdge._transformValue(goodInput7)[0]).toEqual(-55);

      }
    );

    it(
      'should return null on invalid inputs ', function () {

        expect(trackyEdge._transformValue(malformed1)).toEqual(null);
        expect(trackyEdge._transformValue(malformed2)).toEqual(null);
        expect(trackyEdge._transformValue(malformed3)).toEqual(null);
        expect(trackyEdge._transformValue(malformed4)).toEqual(null);
        expect(trackyEdge._transformValue(malformed5)).toEqual(null);
        expect(trackyEdge._transformValue(malformed6)).toEqual(null);
        expect(trackyEdge._transformValue(malformed7)).toEqual(null);
        expect(trackyEdge._transformValue(malformed8)).toEqual(null);

      }
    );


  }
);

describe(
  'tracky.edge.js - _transformValueMatrix', function () {

    var goodInput = 44;
    var goodInput2 = '44%';
    var goodInput3 = [[44, {percent: true}]];
    var goodInput4 = [18, 55, 66, 77];
    var goodInput5 = ['15%', '88%', 45, 66];
    var goodInput6 = {top: 44, right: 88, bottom: '66%', left: 99,};
    var goodInput7 = [14, 66];
    var malformed1 = null;
    var malformed2 = false;
    var malformed3 = {nonodename: 'haha'};
    var malformed4 = NaN;
    var malformed5 = 'burumm';
    var malformed6 = true;

    it(
      'method should be defined', function () {
        expect(trackyEdge._transformValueMatrix).toBeDefined();
        expect(trackyEdge._transformValueMatrix).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an object with property top', function () {
        expect(trackyEdge._transformValueMatrix(goodInput).top).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).top).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).top).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).top).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).top).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).top).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).top).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput).top).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput2).top).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput3).top).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput4).top).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput5).top).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput6).top).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput7).top).not.toEqual(null);
      }
    );

    it(
      'should return an object with property right', function () {
        expect(trackyEdge._transformValueMatrix(goodInput).right).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).right).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).right).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).right).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).right).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).right).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).right).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput).right).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput2).right).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput3).right).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput4).right).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput5).right).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput6).right).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput7).right).not.toEqual(null);
      }
    );

    it(
      'should return an object with property bottom', function () {
        expect(trackyEdge._transformValueMatrix(goodInput).bottom).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).bottom).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).bottom).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).bottom).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).bottom).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).bottom).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).bottom).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput).bottom).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput2).bottom).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput3).bottom).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput4).bottom).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput5).bottom).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput6).bottom).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput7).bottom).not.toEqual(null);
      }
    );
    it(
      'should return an object with property left', function () {
        expect(trackyEdge._transformValueMatrix(goodInput).left).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).left).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).left).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).left).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).left).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).left).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).left).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput).left).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput2).left).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput3).left).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput4).left).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput5).left).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput6).left).not.toEqual(null);
        expect(trackyEdge._transformValueMatrix(goodInput7).left).not.toEqual(null);
      }
    );

    it(
      'should return an integer at index 0 on valid inputs ', function () {

        expect(trackyEdge._transformValueMatrix(goodInput).top[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).top[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).top[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).top[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).top[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).top[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).top[0]).toBeDefined();

        expect(trackyEdge._transformValueMatrix(goodInput).top[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput2).top[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput3).top[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput4).top[0]).toEqual(18);
        expect(trackyEdge._transformValueMatrix(goodInput5).top[0]).toEqual(15);
        expect(trackyEdge._transformValueMatrix(goodInput6).top[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput7).top[0]).toEqual(14);

        expect(trackyEdge._transformValueMatrix(goodInput).right[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).right[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).right[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).right[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).right[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).right[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).right[0]).toBeDefined();

        expect(trackyEdge._transformValueMatrix(goodInput).right[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput2).right[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput3).right[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput4).right[0]).toEqual(55);
        expect(trackyEdge._transformValueMatrix(goodInput5).right[0]).toEqual(88);
        expect(trackyEdge._transformValueMatrix(goodInput6).right[0]).toEqual(88);
        expect(trackyEdge._transformValueMatrix(goodInput7).right[0]).toEqual(66);

        expect(trackyEdge._transformValueMatrix(goodInput).bottom[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).bottom[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).bottom[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).bottom[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).bottom[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).bottom[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).bottom[0]).toBeDefined();

        expect(trackyEdge._transformValueMatrix(goodInput).bottom[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput2).bottom[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput3).bottom[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput4).bottom[0]).toEqual(66);
        expect(trackyEdge._transformValueMatrix(goodInput5).bottom[0]).toEqual(45);
        expect(trackyEdge._transformValueMatrix(goodInput6).bottom[0]).toEqual(66);
        expect(trackyEdge._transformValueMatrix(goodInput7).bottom[0]).toEqual(14);

        expect(trackyEdge._transformValueMatrix(goodInput).left[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput2).left[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput3).left[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput4).left[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput5).left[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput6).left[0]).toBeDefined();
        expect(trackyEdge._transformValueMatrix(goodInput7).left[0]).toBeDefined();

        expect(trackyEdge._transformValueMatrix(goodInput).left[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput2).left[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput3).left[0]).toEqual(44);
        expect(trackyEdge._transformValueMatrix(goodInput4).left[0]).toEqual(77);
        expect(trackyEdge._transformValueMatrix(goodInput5).left[0]).toEqual(66);
        expect(trackyEdge._transformValueMatrix(goodInput6).left[0]).toEqual(99);
        expect(trackyEdge._transformValueMatrix(goodInput7).left[0]).toEqual(66);

      }
    );

    it(
      'should return null or object with null values on invalid inputs ', function () {

        expect(trackyEdge._transformValueMatrix(malformed1)).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed2)).toEqual(null);

        expect(trackyEdge._transformValueMatrix(malformed3).top).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed3).right).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed3).bottom).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed3).left).toEqual(null);

        expect(trackyEdge._transformValueMatrix(malformed4)).toEqual(null);

        expect(trackyEdge._transformValueMatrix(malformed5).top).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed5).right).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed5).bottom).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed5).left).toEqual(null);

        expect(trackyEdge._transformValueMatrix(malformed6).top).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed6).right).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed6).bottom).toEqual(null);
        expect(trackyEdge._transformValueMatrix(malformed6).left).toEqual(null);

      }
    );

  }
);

describe(
  'tracky.edge.js - _transformBreakpoints', function () {

    it(
      'method should be defined', function () {
        expect(trackyEdge._transformBreakpoints).toBeDefined();
        expect(trackyEdge._transformBreakpoints).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array', function () {
        expect(trackyEdge._transformBreakpoints([])).toEqual(jasmine.any(Array));
        expect(trackyEdge._transformBreakpoints(null)).toEqual(jasmine.any(Array));
        expect(trackyEdge._transformBreakpoints(false)).toEqual(jasmine.any(Array));
        expect(trackyEdge._transformBreakpoints({})).toEqual(jasmine.any(Array));
        expect(trackyEdge._transformBreakpoints(NaN)).toEqual(jasmine.any(Array));
        expect(trackyEdge._transformBreakpoints(eventOptions.events.edge.breakpoints)).toEqual(
          jasmine.any(Array)
        );
      }
    );

    it(
      'should return an array with objects', function () {
        trackyEdge
          ._transformBreakpoints(eventOptions.events.edge.breakpoints)
          .forEach(
            function (bp) {
              expect(bp).toEqual(jasmine.any(Object));
            }
          );
      }
    );

    it(
      'should return an array with objects having property css', function () {
        trackyEdge
          ._transformBreakpoints(eventOptions.events.edge.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.css).toBeDefined();
              expect(bp.css).toEqual(jasmine.any(Object));
              expect(bp.css.top).toBeDefined();
              expect(bp.css.right).toBeDefined();
              expect(bp.css.bottom).toBeDefined();
              expect(bp.css.left).toBeDefined();
              expect(bp.css.topRight).toBeDefined();
              expect(bp.css.topLeft).toBeDefined();
              expect(bp.css.bottomRight).toBeDefined();
              expect(bp.css.bottomLeft).toBeDefined();
            }
          );
      }
    );

    it(
      'should return an array with objects having property apply(top/right/bottom/left/tr/tl/br/bl) as boolean',
      function () {
        trackyEdge
          ._transformBreakpoints(eventOptions.events.edge.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.applyTop).toBeDefined();
              expect(bp.applyTop).toEqual(jasmine.any(Boolean));
              expect(bp.applyRight).toBeDefined();
              expect(bp.applyRight).toEqual(jasmine.any(Boolean));
              expect(bp.applyBottom).toBeDefined();
              expect(bp.applyBottom).toEqual(jasmine.any(Boolean));
              expect(bp.applyLeft).toBeDefined();
              expect(bp.applyLeft).toEqual(jasmine.any(Boolean));
              expect(bp.applyTopRight).toBeDefined();
              expect(bp.applyTopRight).toEqual(jasmine.any(Boolean));
              expect(bp.applyTopLeft).toBeDefined();
              expect(bp.applyTopLeft).toEqual(jasmine.any(Boolean));
              expect(bp.applyBottomLeft).toBeDefined();
              expect(bp.applyBottomLeft).toEqual(jasmine.any(Boolean));
              expect(bp.applyBottomRight).toBeDefined();
              expect(bp.applyBottomRight).toEqual(jasmine.any(Boolean));
            }
          );
      }
    );

    it(
      'should return an array with objects having property value', function () {
        trackyEdge
          ._transformBreakpoints(eventOptions.events.edge.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.value).toBeDefined();
              expect(bp.value.top).toBeDefined();
              expect(bp.value.right).toBeDefined();
              expect(bp.value.bottom).toBeDefined();
              expect(bp.value.left).toBeDefined();
            }
          );
      }
    );

    it(
      'should return a callbacks property with having properties match/unmatch', function () {
        trackyEdge
          ._transformBreakpoints(eventOptions.events.edge.breakpoints)
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
      'should return a callbacks property with having properties match(Position)', function () {
        trackyEdge
          ._transformBreakpoints(eventOptions.events.edge.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.callbacks).toBeDefined();
              expect(bp.callbacks.matchTop).toBeDefined();
              expect(bp.callbacks.matchRight).toBeDefined();
              expect(bp.callbacks.matchBottom).toBeDefined();
              expect(bp.callbacks.matchLeft).toBeDefined();
              expect(bp.callbacks.matchTopRight).toBeDefined();
              expect(bp.callbacks.matchTopLeft).toBeDefined();
              expect(bp.callbacks.matchBottomRight).toBeDefined();
              expect(bp.callbacks.matchBottomLeft).toBeDefined();
            }
          );
      }
    );

    it(
      'should return a callbacks property with having properties unmatch(Position)', function () {
        trackyEdge
          ._transformBreakpoints(eventOptions.events.edge.breakpoints)
          .forEach(
            function (bp) {
              expect(bp.callbacks).toBeDefined();
              expect(bp.callbacks.unmatchTop).toBeDefined();
              expect(bp.callbacks.unmatchRight).toBeDefined();
              expect(bp.callbacks.unmatchBottom).toBeDefined();
              expect(bp.callbacks.unmatchLeft).toBeDefined();
              expect(bp.callbacks.unmatchTopRight).toBeDefined();
              expect(bp.callbacks.unmatchTopLeft).toBeDefined();
              expect(bp.callbacks.unmatchBottomRight).toBeDefined();
              expect(bp.callbacks.unmatchBottomLeft).toBeDefined();
            }
          );
      }
    );

    it(
      'should bind onMatch callback property to breakpoint', function () {
        trackyEdge
          ._transformBreakpoints(
            [
              {
                css: {
                  top: 'edge-tracker-top',
                  right: 'edge-tracker-right',
                  bottom: 'edge-tracker-bottom',
                  left: 'edge-tracker-left',
                  topRight: 'edge-tracker-top-right',
                  topLeft: 'edge-tracker-top-left',
                  bottomRight: 'edge-tracker-bottom-right',
                  bottomLeft: 'edge-tracker-bottom-left',
                },
                value: '15%',
                onMatch: function () {
                  return 'match';
                },
                onUnmatch: function () {
                  return 'mismatch';
                },
                onMatchTop: function () {
                  return 'match-top';
                },
                onMatchRight: function () {
                  return 'match-right';
                },
                onMatchBottom: function () {
                  return 'match-bottom';
                },
                onMatchLeft: function () {
                  return 'match-left';
                },
                onMatchTopRight: function () {
                  return 'match-top-right';
                },
                onMatchTopLeft: function () {
                  return 'match-top-left';
                },
                onMatchBottomRight: function () {
                  return 'match-bottom-right';
                },
                onMatchBottomLeft: function () {
                  return 'match-bottom-left';
                },
                onUnmatchTop: function () {
                  return 'un-match-top';
                },
                onUnmatchRight: function () {
                  return 'un-match-right';
                },
                onUnmatchBottom: function () {
                  return 'un-match-bottom';
                },
                onUnmatchLeft: function () {
                  return 'un-match-left';
                },
                onUnmatchTopRight: function () {
                  return 'un-match-top-right';
                },
                onUnmatchTopLeft: function () {
                  return 'un-match-top-left';
                },
                onUnmatchBottomRight: function () {
                  return 'un-match-bottom-right';
                },
                onUnmatchBottomLeft: function () {
                  return 'un-match-bottom-left';
                }
              }
            ]
          )
          .forEach(
            function (bp) {
              expect(typeof bp.callbacks.match).toEqual('function');
              expect(bp.callbacks.match()).toEqual('match');
            }
          );
      }
    );

  }
);

describe(
  'tracky.edge.js - _getBpsByClassNames', function () {

    var exampleArray = ['edge-tracker-top', 'edge-tracker-left', 'not-found'];
    var findIn = ['top', 'right', 'bottom', 'left', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft'];
    it(
      'method should be defined', function () {
        expect(trackyEdge._getBpsByClassNames).toBeDefined();
        expect(trackyEdge._getBpsByClassNames).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return an array or null', function () {
        expect(trackyEdge._getBpsByClassNames([])).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(null)).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(false)).toEqual(null);
        expect(trackyEdge._getBpsByClassNames({})).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(NaN)).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(exampleArray, findIn)).toEqual(jasmine.any(Array));
        expect(trackyEdge._getBpsByClassNames(exampleArray, findIn).length).toEqual(2);
      }
    );

    it(
      'should return an array with objects', function () {
        trackyEdge
          ._getBpsByClassNames(exampleArray, findIn)
          .forEach(
            function (bp) {
              expect(bp).toEqual(jasmine.any(Object));
            }
          );
      }
    );

    it(
      'should return an array or null - findIn parameter', function () {
        expect(trackyEdge._getBpsByClassNames(exampleArray, null)).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(exampleArray, ['something'])).toEqual(jasmine.any(Array));
        expect(trackyEdge._getBpsByClassNames(exampleArray, 'right')).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(exampleArray, {})).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(exampleArray, NaN)).toEqual(null);
        expect(trackyEdge._getBpsByClassNames(exampleArray, findIn)).toEqual(jasmine.any(Array));
        expect(trackyEdge._getBpsByClassNames(exampleArray, findIn).length).toEqual(2);
      }
    );

  }
);
