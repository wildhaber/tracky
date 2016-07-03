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
          max: 500
        }, {
          css: 'mega-element-active',
          min: '40%',
          max: '60%'
        }, {
          min: 60,
          max: '40%'
        },
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
  'tracky.scroll.js general', function () {

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

  }
);
