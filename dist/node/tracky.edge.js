'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tracky = require('./tracky.event');

var _tracky2 = _interopRequireDefault(_tracky);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TrackyEdge = function (_TrackyEvent) {
  _inherits(TrackyEdge, _TrackyEvent);

  function TrackyEdge() {
    _classCallCheck(this, TrackyEdge);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TrackyEdge).apply(this, arguments));
  }

  _createClass(TrackyEdge, [{
    key: '_listener',


    /**
     * _listener
     * @param domNode
     * @param e
     * @private
     */
    value: function _listener(e) {
      if (typeof e !== 'undefined' && e && typeof e.currentTarget !== 'undefined') {
        var position = this._getMousePosition(e.currentTarget, e);
        if (position) {
          this.classify(e.currentTarget, position);
        }
      }
    }

    /**
     * bindEvent
     * @param domNode
     */

  }, {
    key: 'bindEvent',
    value: function bindEvent() {
      var _this2 = this;

      var domNode = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (domNode && typeof domNode.addEventListener === 'function') {

        domNode.addEventListener('mousemove', (0, _lodash2.default)(this._bindListener, 80, {
          leading: true,
          maxWait: 40,
          trailing: false
        }));

        domNode.addEventListener('mouseleave', function (e) {
          _this2.cleanupClasses(e.target);
        });
      }
    }

    /**
     * _getMousePosition
     * @param domNode
     * @returns {Object | null}
     * @private
     */

  }, {
    key: '_getMousePosition',
    value: function _getMousePosition(domNode, e) {

      var boxCoord = typeof domNode !== 'undefined' && domNode && typeof domNode.getBoundingClientRect === 'function' ? domNode.getBoundingClientRect() : null;

      if (!boxCoord) {
        return null;
      }

      var clientY = typeof e.clientY !== 'undefined' ? e.clientY : 0;
      var clientX = typeof e.clientX !== 'undefined' ? e.clientX : 0;

      var absolute = {
        top: Math.abs(parseInt(clientY - boxCoord.top, 10)),
        right: Math.abs(parseInt(clientX - boxCoord.left - boxCoord.width, 10)),
        bottom: Math.abs(parseInt(clientY - boxCoord.top - boxCoord.height, 10)),
        left: Math.abs(parseInt(clientX - boxCoord.left, 10))
      };

      var percent = {
        top: boxCoord.height ? this._percentRound(absolute.top / boxCoord.height * 100) : 0,
        right: boxCoord.width ? this._percentRound(absolute.right / boxCoord.width * 100) : 0,
        bottom: boxCoord.height ? this._percentRound(absolute.bottom / boxCoord.height * 100) : 0,
        left: boxCoord.width ? this._percentRound(absolute.left / boxCoord.width * 100) : 0
      };

      return {
        absolute: absolute,
        percent: percent
      };
    }

    /**
     * unbindEvent
     * @param domNode
     */

  }, {
    key: 'unbindEvent',
    value: function unbindEvent() {
      var domNode = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (domNode && typeof domNode.removeEventListener === 'function') {
        domNode.removeEventListener('mousemove', this._bindListener);
      }
    }

    /**
     * bindEvents
     */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this3 = this;

      this.getNodes().forEach(function (n) {
        if (n) {
          n.forEach(function (_n) {
            _this3.bindEvent(_n);
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
      var _this4 = this;

      this.getNodes().forEach(function (n) {
        if (n) {
          n.forEach(function (_n) {
            _this4.unbindEvent(_n);
            _this4.cleanupClasses(_n);
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
      var _this5 = this;

      // Ugly but necessary to keep this-context combined with eventListener add/remove
      this._bindListener = function (e) {
        _this5._listener(e);
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
      var _this6 = this;

      var nodes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (nodes && nodes instanceof Array) {
        nodes.forEach(function (_n) {
          _this6.bindEvent(_n);
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
      var _this7 = this;

      var nodes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (nodes && nodes instanceof Array) {
        nodes.forEach(function (_n) {
          _this7.unbindEvent(_n);
        });
      }
    }

    /**
     * _transformValueMatrix
     * @param value
     * @returns {Object | null}
     * @private
     */

  }, {
    key: '_transformValueMatrix',
    value: function _transformValueMatrix() {
      var _this8 = this;

      var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (value) {

        var master = {
          top: null,
          right: null,
          bottom: null,
          left: null
        };

        if (value instanceof Array) {

          value = value.map(function (v) {
            return _this8._transformValue(v);
          });

          if (value.length >= 2) {
            master = {
              top: value[0],
              right: value[1],
              bottom: typeof value[2] !== 'undefined' ? value[2] : value[0],
              left: typeof value[3] !== 'undefined' ? value[3] : value[1]
            };
          } else if (value.length > 0) {
            master = {
              top: value[0],
              right: value[0],
              bottom: value[0],
              left: value[0]
            };
          }
        } else if (typeof value === 'number' && !isNaN(value) || typeof value === 'string') {
          var referenceValue = this._transformValue(value);
          master = {
            top: referenceValue,
            right: referenceValue,
            bottom: referenceValue,
            left: referenceValue
          };
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value && (typeof value.top !== 'undefined' || typeof value.right !== 'undefined' || typeof value.bottom !== 'undefined' || typeof value.left !== 'undefined')) {
          master = {
            top: typeof value.top !== 'undefined' ? this._transformValue(value.top) : null,
            right: typeof value.right !== 'undefined' ? this._transformValue(value.right) : null,
            bottom: typeof value.bottom !== 'undefined' ? this._transformValue(value.bottom) : null,
            left: typeof value.left !== 'undefined' ? this._transformValue(value.left) : null
          };
        }

        return master;
      } else {
        return null;
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
      var _this9 = this;

      return bp instanceof Array ? bp.filter(function (p) {
        return typeof p === 'number' && !isNaN(p) || typeof p === 'string' && !isNaN(parseFloat(p)) || p instanceof Array && p.length && p.length <= 4 || (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && p !== null && (typeof p.value !== 'undefined' || typeof p.top !== 'undefined' || typeof p.right !== 'undefined' || typeof p.bottom !== 'undefined' || typeof p.left !== 'undefined');
      }).map(function (p) {

        var prep = typeof p === 'number' || typeof p === 'string' || p instanceof Array ? {
          value: p
        } : p;

        var hasValue = typeof prep.value !== 'undefined' && prep.value;

        var hasCustomCss = typeof prep.css !== 'undefined' && !!prep.css;

        if (hasCustomCss && typeof prep.css === 'string') {
          prep.css = {
            top: prep.css,
            right: prep.css,
            bottom: prep.css,
            left: prep.css,
            topLeft: prep.css,
            topRight: prep.css,
            bottomLeft: prep.css,
            bottomRight: prep.css
          };
        }

        if (hasValue) {
          prep.value = _this9._transformValueMatrix(prep.value);
          if (!prep.value) {
            return null;
          }
        }

        var applyTop = !!(typeof prep.value.top !== 'undefined' && prep.value.top);
        var applyRight = !!(typeof prep.value.right !== 'undefined' && prep.value.right);
        var applyBottom = !!(typeof prep.value.bottom !== 'undefined' && prep.value.bottom);
        var applyLeft = !!(typeof prep.value.left !== 'undefined' && prep.value.left);
        var applyTopRight = !!(applyTop && applyRight);
        var applyTopLeft = !!(applyTop && applyLeft);
        var applyBottomRight = !!(applyBottom && applyRight);
        var applyBottomLeft = !!(applyBottom && applyLeft);

        return {
          css: {
            top: applyTop ? hasCustomCss && typeof prep.css.top !== 'undefined' ? prep.css.top : _this9._buildClassName(prep.value.top[0] + (prep.value.top[1].percent ? 'pc' : ''), 'top-') : null,
            right: applyRight ? hasCustomCss && typeof prep.css.right !== 'undefined' ? prep.css.right : _this9._buildClassName(prep.value.right[0] + (prep.value.right[1].percent ? 'pc' : ''), 'right-') : null,
            bottom: applyBottom ? hasCustomCss && typeof prep.css.bottom !== 'undefined' ? prep.css.bottom : _this9._buildClassName(prep.value.bottom[0] + (prep.value.bottom[1].percent ? 'pc' : ''), 'bottom-') : null,
            left: applyTop ? hasCustomCss && typeof prep.css.left !== 'undefined' ? prep.css.left : _this9._buildClassName(prep.value.left[0] + (prep.value.left[1].percent ? 'pc' : ''), 'left-') : null,
            topRight: applyTopRight ? hasCustomCss && typeof prep.css.topRight !== 'undefined' ? prep.css.topRight : _this9._buildClassName(prep.value.top[0] + (prep.value.top[1].percent ? 'pc' : '') + '-' + prep.value.right[0] + (prep.value.right[1].percent ? 'pc' : ''), 'top-right-') : null,
            topLeft: applyTopLeft ? hasCustomCss && typeof prep.css.topLeft !== 'undefined' ? prep.css.topLeft : _this9._buildClassName(prep.value.top[0] + (prep.value.top[1].percent ? 'pc' : '') + '-' + prep.value.left[0] + (prep.value.left[1].percent ? 'pc' : ''), 'top-left-') : null,
            bottomLeft: applyBottomLeft ? hasCustomCss && typeof prep.css.bottomLeft !== 'undefined' ? prep.css.bottomLeft : _this9._buildClassName(prep.value.bottom[0] + (prep.value.bottom[1].percent ? 'pc' : '') + '-' + prep.value.left[0] + (prep.value.left[1].percent ? 'pc' : ''), 'bottom-left-') : null,
            bottomRight: applyBottomRight ? hasCustomCss && typeof prep.css.bottomRight !== 'undefined' ? prep.css.bottomRight : _this9._buildClassName(prep.value.bottom[0] + (prep.value.bottom[1].percent ? 'pc' : '') + '-' + prep.value.right[0] + (prep.value.right[1].percent ? 'pc' : ''), 'bottom-right-') : null
          },
          applyTop: applyTop,
          applyRight: applyRight,
          applyBottom: applyBottom,
          applyLeft: applyLeft,
          applyTopRight: applyTopRight,
          applyTopLeft: applyTopLeft,
          applyBottomLeft: applyBottomLeft,
          applyBottomRight: applyBottomRight,
          callbacks: {
            match: typeof prep.onMatch === 'function' ? prep.onMatch : null,
            unmatch: typeof prep.onUnmatch === 'function' ? prep.onUnmatch : null,
            matchTop: typeof prep.onMatchTop === 'function' ? prep.onMatchTop : null,
            matchRight: typeof prep.onMatchRight === 'function' ? prep.onMatchRight : null,
            matchBottom: typeof prep.onMatchBottom === 'function' ? prep.onMatchBottom : null,
            matchLeft: typeof prep.onMatchLeft === 'function' ? prep.onMatchLeft : null,
            matchTopRight: typeof prep.onMatchTopRight === 'function' ? prep.onMatchTopRight : null,
            matchTopLeft: typeof prep.onMatchTopLeft === 'function' ? prep.onMatchTopLeft : null,
            matchBottomRight: typeof prep.onMatchBottomRight === 'function' ? prep.onMatchBottomRight : null,
            matchBottomLeft: typeof prep.onMatchBottomLeft === 'function' ? prep.onMatchBottomLeft : null,
            unmatchTop: typeof prep.onUnmatchTop === 'function' ? prep.onUnmatchTop : null,
            unmatchRight: typeof prep.onUnmatchRight === 'function' ? prep.onUnmatchRight : null,
            unmatchBottom: typeof prep.onUnmatchBottom === 'function' ? prep.onUnmatchBottom : null,
            unmatchLeft: typeof prep.onUnmatchLeft === 'function' ? prep.onUnmatchLeft : null,
            unmatchTopRight: typeof prep.onUnmatchTopRight === 'function' ? prep.onUnmatchTopRight : null,
            unmatchTopLeft: typeof prep.onUnmatchTopLeft === 'function' ? prep.onUnmatchTopLeft : null,
            unmatchBottomRight: typeof prep.onUnmatchBottomRight === 'function' ? prep.onUnmatchBottomRight : null,
            unmatchBottomLeft: typeof prep.onUnmatchBottomLeft === 'function' ? prep.onUnmatchBottomLeft : null
          },
          value: hasValue ? prep.value : null
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
      var value = arguments.length <= 1 || arguments[1] === undefined ? {
        absolute: { top: 0, right: 0, bottom: 0, left: 0 },
        percent: { top: 0, right: 0, bottom: 0, left: 0 }
      } : arguments[1];


      var bp = this._options.breakpoints;
      var classes = [];

      if (value && bp.length > 0) {
        for (var l = bp.length; l; l--) {
          var _bp = bp[l - 1];

          var topMatch = false;
          var rightMatch = false;
          var bottomMatch = false;
          var leftMatch = false;

          // Check top
          if (_bp.applyTop && (!_bp.value.top[1].percent && value.absolute.top <= _bp.value.top[0] || _bp.value.top[1].percent && value.percent.top <= _bp.value.top[0])) {
            topMatch = true;
            classes.push(_bp.css.top);
          }

          // Check right
          if (_bp.applyRight && (!_bp.value.right[1].percent && value.absolute.right <= _bp.value.right[0] || _bp.value.right[1].percent && value.percent.right <= _bp.value.right[0])) {
            rightMatch = true;
            classes.push(_bp.css.right);
          }

          // Check bottom
          if (_bp.applyBottom && (!_bp.value.bottom[1].percent && value.absolute.bottom <= _bp.value.bottom[0] || _bp.value.bottom[1].percent && value.percent.bottom <= _bp.value.bottom[0])) {
            bottomMatch = true;
            classes.push(_bp.css.bottom);
          }

          // Check left
          if (_bp.applyLeft && (!_bp.value.left[1].percent && value.absolute.left <= _bp.value.left[0] || _bp.value.left[1].percent && value.percent.left <= _bp.value.left[0])) {
            leftMatch = true;
            classes.push(_bp.css.left);
          }

          // Check top right
          if (_bp.applyTopRight && topMatch && rightMatch) {
            classes.push(_bp.css.topRight);
          }

          // Check top left
          if (_bp.applyTopLeft && topMatch && leftMatch) {
            classes.push(_bp.css.topLeft);
          }

          // Check bottom right
          if (_bp.applyBottomRight && bottomMatch && rightMatch) {
            classes.push(_bp.css.bottomRight);
          }

          // Check bottom left
          if (_bp.applyBottomLeft && bottomMatch && leftMatch) {
            classes.push(_bp.css.bottomLeft);
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
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['top', 'right', 'bottom', 'left', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']), 'match');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['top']), 'matchTop');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['right']), 'matchRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottom']), 'matchBottom');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['left']), 'matchLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['topRight']), 'matchTopRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['topleft']), 'matchTopLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottomRight']), 'matchBottomRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['bottomLeft']), 'matchBottomLeft');
      }

      if (removed instanceof Array && removed.length > 0) {
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['top', 'right', 'bottom', 'left', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft']), 'unmatch');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['top']), 'unmatchTop');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['right']), 'unmatchRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['bottom']), 'unmatchBottom');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['left']), 'unmatchLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['topRight']), 'unmatchTopRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['topleft']), 'unmatchTopLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['bottomRight']), 'unmatchBottomRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['bottomLeft']), 'unmatchBottomLeft');
      }
    }
  }]);

  return TrackyEdge;
}(_tracky2.default);

exports.default = TrackyEdge;