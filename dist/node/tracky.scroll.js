'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tracky = require('./tracky.event');

var _tracky2 = _interopRequireDefault(_tracky);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrackyScroll = function (_TrackyEvent) {
  _inherits(TrackyScroll, _TrackyEvent);

  function TrackyScroll() {
    _classCallCheck(this, TrackyScroll);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TrackyScroll).apply(this, arguments));
  }

  _createClass(TrackyScroll, [{
    key: '_listener',


    /**
     * _listener
     * @param domNode
     * @private
     */
    value: function _listener(domNode) {

      if (typeof domNode !== 'undefined') {
        var position = this._getScrollPosition(domNode);
        this.classify(domNode, position);
      }
    }

    /**
     * bindEvent
     * @param domNode
     */

  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var domNode = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (domNode && typeof domNode.addEventListener !== 'undefined') {

        domNode.addEventListener('scroll', this._bindListener);

        this._listener(domNode);
      }
    }

    /**
     * _getScrollPosition
     * @param domNode
     * @returns {*}
     * @private
     */

  }, {
    key: '_getScrollPosition',
    value: function _getScrollPosition() {
      var domNode = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (this._isBody(domNode)) {

        var doc = typeof document !== 'undefined' ? document.documentElement : null;
        var b = typeof document !== 'undefined' ? document.body : null;

        return doc && b ? {
          absolute: {
            top: doc.scrollTop || b.scrollTop,
            left: doc.scrollLeft || b.scrollLeft
          },
          percent: {
            top: this._percentRound(doc.scrollTop || b.scrollTop / ((doc.scrollHeight || b.scrollHeight) - doc.clientHeight) * 100),
            left: this._percentRound(!!doc.scrollLeft || !!b.scrollLeft ? doc.scrollLeft || b.scrollLeft / ((doc.scrollWidth || b.scrollWidth) - doc.clientWidth) * 100 : 0)
          }
        } : {
          absolute: {
            top: 0,
            left: 0
          },
          percent: {
            top: 0,
            left: 0
          }
        };
      } else {
        return domNode ? {
          absolute: {
            top: domNode.scrollTop,
            left: domNode.scrollLeft
          },
          percent: {
            top: this._percentRound(domNode.scrollTop / (domNode.scrollHeight - domNode.offsetHeight) * 100),
            left: this._percentRound(domNode.scrollLeft ? domNode.scrollLeft / (domNode.scrollWidth - domNode.offsetWidth) * 100 : 0)
          }
        } : {
          absolute: {
            top: 0,
            left: 0
          },
          percent: {
            top: 0,
            left: 0
          }
        };
      }
    }

    /**
     * bindBodyEvent
     */

  }, {
    key: 'bindBodyEvent',
    value: function bindBodyEvent() {

      if (typeof window !== 'undefined') {

        /* istanbul ignore next */
        window.addEventListener('scroll', this._bindBodyListener);

        /* istanbul ignore next */
        this._listener(document.body);
      }
    }

    /**
     * unbindBodyEvent
     */

  }, {
    key: 'unbindBodyEvent',
    value: function unbindBodyEvent() {

      if (typeof window !== 'undefined') {

        /* istanbul ignore next */
        window.removeEventListener('scroll', this._bindBodyListener);
      }
    }

    /**
     * unbindEvent
     * @param domNode
     */

  }, {
    key: 'unbindEvent',
    value: function unbindEvent() {
      var domNode = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (domNode && typeof domNode.removeEventListener !== 'undefined') {
        domNode.removeEventListener('scroll', this._bindListener);
      }
    }

    /**
     * _isBody
     * @param domNode
     * @returns {boolean}
     * @private
     */

  }, {
    key: '_isBody',
    value: function _isBody(domNode) {
      return !!domNode && _typeof(domNode.nodeName) && domNode.nodeName === 'BODY';
    }

    /**
     * bindEvents
     */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.getNodes().forEach(function (n) {
        if (n) {
          n.forEach(function (_n) {
            if (_this2._isBody(_n)) {
              _this2.bindBodyEvent();
            } else {
              _this2.bindEvent(_n);
            }
          });
        }
      });
    }

    /**
     * unbindEvents
     */

  }, {
    key: 'unbindEvents',
    value: function unbindEvents() {
      var _this3 = this;

      this.getNodes().forEach(function (n) {
        if (n) {
          n.forEach(function (_n) {
            if (_this3._isBody(_n)) {
              _this3.unbindBodyEvent();

              /* istanbul ignore if */
              if (typeof document !== 'undefined') {
                _this3.cleanupClasses(document.body);
              }
            } else {
              _this3.unbindEvent(_n);
              _this3.cleanupClasses(_n);
            }
          });
        }
      });
    }

    /**
     * onStart
     */

  }, {
    key: 'onStart',
    value: function onStart() {
      var _this4 = this;

      // Ugly but necessary to keep this-context combined with eventListener add/remove
      this._bindListener = function (e) {
        _this4._listener(e.target);
      };

      // It becomes even worse if we consider that body/window needs a separate handling
      // but necessary to keep this-context combined with eventListener add/remove
      var last_known_scroll_position = 0; // eslint-disable-line no-unused-vars
      var ticking = false;

      /* istanbul ignore next */
      this._bindBodyListener = function (e) {

        last_known_scroll_position = window.scrollY;

        if (!ticking) {
          window.requestAnimationFrame(function () {
            _this4._listener(e.target.activeElement);
            ticking = false;
          });
        }

        ticking = true;
      };

      this.bindEvents();
    }

    /**
     * onStop
     */

  }, {
    key: 'onStop',
    value: function onStop() {
      this.unbindEvents();
    }

    /**
     * onAdd
     * @param nodes
     */

  }, {
    key: 'onAdd',
    value: function onAdd() {
      var _this5 = this;

      var nodes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (nodes && nodes instanceof Array) {
        nodes.forEach(function (_n) {
          if (_this5._isBody(_n)) {
            _this5.bindBodyEvent();
          } else {
            _this5.bindEvent(_n);
          }
        });
      }
    }

    /**
     * onRemove
     * @param nodes
     */

  }, {
    key: 'onRemove',
    value: function onRemove() {
      var _this6 = this;

      var nodes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (nodes && nodes instanceof Array) {
        nodes.forEach(function (_n) {
          if (_this6._isBody(_n)) {
            _this6.unbindBodyEvent();
          } else {
            _this6.unbindEvent(_n);
          }
        });
      }
    }

    /**
     * _transformBreakpoints
     * @param bp
     * @returns {Array|*}
     * @private
     */

  }, {
    key: '_transformBreakpoints',
    value: function _transformBreakpoints(bp) {
      var _this7 = this;

      return bp instanceof Array ? bp.filter(function (p) {
        return typeof p === 'number' && !isNaN(p) || typeof p === 'string' && !isNaN(parseFloat(p)) || (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && p !== null && (typeof p.value !== 'undefined' || typeof p.min !== 'undefined' && typeof p.max !== 'undefined');
      }).map(function (p) {

        var go = _this7._globalOptions;

        var prep = typeof p === 'number' || typeof p === 'string' ? {
          value: p
        } : p;

        var hasBetween = typeof prep.min === 'undefined' || typeof prep.max === 'undefined' ? false : typeof prep.applyBt !== 'undefined' ? prep.applyBt : true;

        var hasValue = !hasBetween && typeof prep.value !== 'undefined';

        var hasCustomCss = typeof prep.css !== 'undefined' && !!prep.css;

        if (hasCustomCss && typeof prep.css === 'string') {
          prep.css = {
            eq: prep.css,
            bt: prep.css
          };
        }

        if (hasValue) {
          prep.value = _this7._transformValue(prep.value);
          if (!prep.value) {
            return null;
          }
        } else if (hasBetween) {
          prep.min = _this7._transformValue(prep.min);
          prep.max = _this7._transformValue(prep.max);
          if (!prep.min || !prep.max) {
            return null;
          }
        }

        return {
          css: {
            lt: !hasBetween ? hasCustomCss && typeof prep.css.lt !== 'undefined' ? prep.css.lt : _this7._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classLtPrefix) : null,
            gt: !hasBetween ? hasCustomCss && typeof prep.css.gt !== 'undefined' ? prep.css.gt : _this7._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classGtPrefix) : null,
            eq: !hasBetween ? hasCustomCss && typeof prep.css.eq !== 'undefined' ? prep.css.eq : _this7._buildClassName(prep.value[0] + (prep.value[1].percent ? 'pc' : ''), go.classEqPrefix) : null,
            bt: hasBetween ? hasCustomCss && typeof prep.css.bt !== 'undefined' ? prep.css.bt : _this7._buildClassName(prep.min[0] + (prep.min[1].percent ? 'pc' : '') + '-' + prep.max[0] + (prep.max[1].percent ? 'pc' : ''), go.classBtPrefix) : null
          },
          axis: typeof prep.axis === 'string' && prep.axis.toLowerCase() === 'x' ? 'x' : 'y',
          applyLt: !hasBetween && typeof prep.applyLt !== 'undefined' ? prep.applyLt : !hasBetween,
          applyGt: !hasBetween && typeof prep.applyGt !== 'undefined' ? prep.applyGt : !hasBetween,
          applyEq: !hasBetween && typeof prep.applyEq !== 'undefined' ? prep.applyEq : !hasBetween,
          applyBt: hasBetween,
          callbacks: {
            match: typeof prep.onMatch === 'function' ? prep.onMatch : null,
            unmatch: typeof prep.onUnmatch === 'function' ? prep.onUnmatch : null,
            lower: typeof prep.onLower === 'function' ? prep.onLower : null,
            greater: typeof prep.onGreater === 'function' ? prep.onGreater : null
          },
          value: hasValue ? prep.value : null,
          min: hasBetween ? prep.min : null,
          max: hasBetween ? prep.max : null
        };
      }).filter(function (pObj) {
        return !!pObj;
      }) : [];
    }

    /**
     * classify
     * @param domNode
     * @param value
     */

  }, {
    key: 'classify',
    value: function classify(domNode) {
      var value = arguments.length <= 1 || arguments[1] === undefined ? { absolute: { top: 0, left: 0 }, percent: { top: 0, left: 0 } } : arguments[1];


      var bp = this._options.breakpoints;
      var classes = [];

      if (bp.length > 0) {
        for (var l = bp.length; l; l--) {
          var _bp = bp[l - 1];
          var _value = _bp.axis === 'x' ? {
            absolute: value.absolute.left,
            percent: value.percent.left
          } : {
            absolute: value.absolute.top,
            percent: value.percent.top
          };

          // Check lt
          if (_bp.applyLt && (!_bp.value[1].percent && _value.absolute < _bp.value[0] || _bp.value[1].percent && _value.percent < _bp.value[0])) {
            classes.push(_bp.css.lt);
          }

          // Check gt
          if (_bp.applyGt && (!_bp.value[1].percent && _value.absolute > _bp.value[0] || _bp.value[1].percent && _value.percent > _bp.value[0])) {
            classes.push(_bp.css.gt);
          }

          // Check eq
          if (_bp.applyEq && (!_bp.value[1].percent && _value.absolute === _bp.value[0] || _bp.value[1].percent && _value.percent === _bp.value[0])) {
            classes.push(_bp.css.eq);
          }

          // Check between
          if (_bp.applyBt && (!_bp.min[1].percent && _value.absolute >= _bp.min[0] || _bp.min[1].percent && _value.percent >= _bp.min[0]) && (!_bp.max[1].percent && _value.absolute <= _bp.max[0] || _bp.max[1].percent && _value.percent <= _bp.max[0])) {
            classes.push(_bp.css.bt);
          }
        }
      }

      this.attachClasses(domNode, classes);
    }

    /**
     * callbackHandler
     * @param domNode
     * @param added
     * @param removed
     */

  }, {
    key: 'callbackHandler',
    value: function callbackHandler(domNode, added, removed) {

      if (added instanceof Array && added.length > 0) {
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['eq', 'bt']), 'match');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['lt']), 'lower');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gt']), 'greater');
      }

      if (removed instanceof Array && removed.length > 0) {
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['eq', 'bt']), 'unmatch');
      }
    }
  }]);

  return TrackyScroll;
}(_tracky2.default);

exports.default = TrackyScroll;