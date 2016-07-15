'use strict';

// Describe

var TrackyEvent = require('../../../dist/node/tracky.event').default;

var eventKey = 'dummy-event-key';

var trackyEvent = new TrackyEvent(eventKey);
var trackyEventEmpty = new TrackyEvent();


describe(
  'tracky.event.js - constructor', function () {

    it(
      'should bind event key', function () {
        expect(trackyEvent._key).toEqual(eventKey);
      }
    );

    it(
      'should bind event key undefined if not set', function () {
        expect(trackyEventEmpty._key).toEqual(undefined);
      }
    );

  }
);


describe(
  'tracky.event.js - add', function () {

    it(
      'should have an add method', function () {
        expect(trackyEvent.add).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return undefined', function () {
        expect(trackyEvent.add()).toEqual(undefined);
      }
    );

  }
);

describe(
  'tracky.event.js - remove', function () {

    it(
      'should have a remove method', function () {
        expect(trackyEvent.remove).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return undefined', function () {
        expect(trackyEvent.remove()).toEqual(undefined);
      }
    );

  }
);


describe(
  'tracky.event.js - attachClasses', function () {

    it(
      'should have an attachClasses method', function () {
        expect(trackyEvent.attachClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return undefined when domNode or classNames are not provided', function () {
        expect(trackyEvent.attachClasses()).toEqual(undefined);
        expect(trackyEvent.attachClasses('domNodeDummy')).toEqual(undefined);
        expect(trackyEvent.attachClasses('domNodeDummy', 'no-array')).toEqual(undefined);
      }
    );

    it(
      'should not throw an exception when everything is fine', function () {

        var mockedDomNode = {
          className: 'simple-class is-cool',
          classList: {
            add: function () {
            },
            remove: function () {
            }
          }
        };

        expect(trackyEvent.attachClasses(mockedDomNode, ['is-cool'])).toEqual(undefined);

      }
    );

    it(
      'should remove a given class', function () {

        var mockedDomNode = {
          className: 'simple-class is-cool',
          classList: {
            add: function () {
            },
            remove: function () {
            }
          }
        };

        trackyEvent._classNames = ['simple-class'];
        trackyEvent.callbackHandler = function (domNode, toApply, toRemove) {
          return {
            domNode: domNode,
            toApply: toApply,
            toRemove: toRemove,
          }
        };

        expect(trackyEvent.attachClasses(mockedDomNode, ['is-cool'])).toEqual(undefined);

      }
    );

  }
);


describe(
  'tracky.event.js - cleanupClasses', function () {

    var mockedDomNode = {
      className: 'simple-class is-cool',
      classList: {
        add: function () {
        },
        remove: function () {
        }
      }
    };

    it(
      'should have a cleanupClasses method', function () {
        expect(trackyEvent.cleanupClasses).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return undefined', function () {
        expect(trackyEvent.cleanupClasses(mockedDomNode)).toEqual(undefined);
      }
    );

    it(
      'should remove any classes applied by listener', function () {


        trackyEvent._classNames = ['simple-class'];

        expect(trackyEvent.cleanupClasses(mockedDomNode)).toEqual(undefined);
      }
    );

  }
);

describe(
  'tracky.event.js - applyCallbacks', function () {

    var mockedDomNode = {
      className: 'simple-class is-cool',
      classList: {
        add: function () {
        },
        remove: function () {
        }
      }
    };

    it(
      'should have a _applyCallbacks method', function () {
        expect(trackyEvent._applyCallbacks).toEqual(jasmine.any(Function));
      }
    );

    it(
      'should return undefined', function () {
        expect(trackyEvent._applyCallbacks(mockedDomNode)).toEqual(undefined);
      }
    );

    it(
      'should execute callbacks from breakpoints', function () {

        trackyEvent._classNames = ['simple-class'];
        var breakpoints = [
          {
            callbacks: {
              honolulu: function () {
              },
            }
          }
        ];

        expect(trackyEvent._applyCallbacks(mockedDomNode, breakpoints, 'honolulu')).toEqual(undefined);
      }
    );

  }
);
