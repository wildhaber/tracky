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

var TrackyOrientation = function (_TrackyEvent) {
  _inherits(TrackyOrientation, _TrackyEvent);

  function TrackyOrientation() {
    _classCallCheck(this, TrackyOrientation);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TrackyOrientation).apply(this, arguments));
  }

  _createClass(TrackyOrientation, [{
    key: '_listener',


    /**
     * _listener
     * @param e
     * @private
     */
    value: function _listener(e) {

      if (typeof e !== 'undefined' && e && typeof e.target !== 'undefined') {
        var orientation = this._getOrientation(e);
        if (orientation) {
          this.classify(orientation);
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

      if (typeof window !== 'undefined' && typeof window.DeviceOrientationEvent !== 'undefined') {
        /* istanbul ignore next */
        window.addEventListener('deviceorientation', (0, _lodash2.default)(this._bindListener, 100, {
          leading: true,
          maxWait: 200,
          trailing: true
        }));
      }
    }

    /**
     * _getOrientation
     * @returns {Object | null}
     * @private
     */

  }, {
    key: '_getOrientation',
    value: function _getOrientation() {
      var e = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (!e) {
        return null;
      }

      var v = this._faceCorrection({
        alpha: typeof e.alpha === 'number' ? Math.round(e.alpha) : 0,
        beta: typeof e.beta === 'number' ? Math.round(e.beta) : 0,
        gamma: typeof e.gamma === 'number' ? Math.round(e.gamma) : 0
      });

      var directionKeys = {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right',
        stay: 'stay'
      };

      var absolute = {
        alpha: Math.abs(v.alpha),
        beta: Math.abs(v.beta),
        gamma: Math.abs(v.gamma)
      };

      var percent = {
        alpha: v.alpha ? this._percentRound(Math.abs(v.alpha) / 360 * 100) : 0,
        beta: v.beta ? this._percentRound(Math.abs(v.beta) / 180 * 100) : 0,
        gamma: v.gamma ? this._percentRound(Math.abs(v.gamma) / 90 * 100) : 0
      };

      var direction = {
        alpha: v.alpha > 0 ? directionKeys.left : v.alpha < 0 ? directionKeys.right : directionKeys.stay,
        beta: v.beta > 0 ? directionKeys.down : v.beta < 0 ? directionKeys.up : directionKeys.stay,
        gamma: v.gamma > 0 ? directionKeys.right : v.gamma < 0 ? directionKeys.left : directionKeys.stay
      };

      return {
        absolute: absolute,
        percent: percent,
        direction: direction
      };
    }

    /**
     * _faceCorrection
     * @param {object} orientation
     * @returns {object}
     * @private
     */

  }, {
    key: '_faceCorrection',
    value: function _faceCorrection() {
      var orientation = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (orientation && (typeof orientation === 'undefined' ? 'undefined' : _typeof(orientation)) === 'object' && typeof orientation.alpha === 'number' && typeof orientation.beta === 'number' && typeof orientation.gamma === 'number') {

        var face = this.getFace();

        /**
         * correction preset
         * @type {{alpha: number, beta: number, gamma: number}}
         */
        var corrections = {
          alpha: 0,
          beta: 0,
          gamma: 0
        };

        /**
         * define corrections
         */
        switch (face) {
          case 'portrait':
            corrections.beta = -90;
            break;
          case 'portrait-upside-down':
            corrections.alpha = -180;
            corrections.beta = 90;
            break;
          case 'landscape-left':
            corrections.beta = -90;
            corrections.gamma = 90;
            break;
          case 'landscape-right':
            corrections.beta = -90;
            corrections.gamma = -90;
            break;
          case 'display-up':
            break;
          case 'display-down':
            corrections.beta = -180;
            break;
          default:
            break;
        }

        return {
          alpha: orientation.alpha + corrections.alpha,
          beta: orientation.beta + corrections.beta,
          gamma: orientation.gamma + corrections.gamma
        };
      } else {
        return orientation;
      }
    }

    /**
     * getFace
     * @returns {string}
     */

  }, {
    key: 'getFace',
    value: function getFace() {
      return _typeof(this._options) === 'object' && typeof this._options.face === 'string' && ~this.getFaces().list.indexOf(this._options.face.toLowerCase()) ? this._options.face.toLowerCase() : this.getFaces().default;
    }

    /**
     * getFaces
     * @returns {object}
     */

  }, {
    key: 'getFaces',
    value: function getFaces() {
      return {
        list: ['portrait', 'portrait-upside-down', 'landscape-left', 'landscape-right', 'display-up', 'display-down'],
        default: 'portrait'
      };
    }

    /**
     * setFace
     * @param face
     */

  }, {
    key: 'setFace',
    value: function setFace() {
      var face = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      this._options.face = face;
      return this;
    }

    /**
     * unbindEvent
     */

  }, {
    key: 'unbindEvent',
    value: function unbindEvent() {
      if (typeof window !== 'undefined') {
        /* istanbul ignore next */
        window.removeEventListener('deviceorientation', this._bindListener);
      }
    }

    /**
     * bindEvents
     */

  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      this.bindEvent();
    }

    /**
     * unbindEvents
     */

  }, {
    key: 'unbindEvents',
    value: function unbindEvents() {
      var _this2 = this;

      this.unbindEvent();

      this.getNodes().forEach(function (n) {
        if (n) {
          n.forEach(function (_n) {
            _this2.cleanupClasses(_n);
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
      var _this3 = this;

      // Ugly but necessary to keep this-context combined with eventListener add/remove
      this._bindListener = function (e) {
        _this3._listener(e);
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
     */

  }, {
    key: 'onAdd',
    value: function onAdd() {}
    // nothing todo onAdd


    /**
     * onRemove
     * @param nodes
     */

  }, {
    key: 'onRemove',
    value: function onRemove() {
      var _this4 = this;

      var nodes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (nodes && nodes instanceof Array) {
        nodes.forEach(function (_n) {
          _this4.unbindEvent(_n);
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
      var _this5 = this;

      var value = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (value) {

        var master = {
          alpha: null,
          beta: null,
          gamma: null
        };

        if (value instanceof Array) {

          value = value.map(function (v) {
            return _this5._transformValue(v);
          });

          master = {
            alpha: typeof value[0] !== 'undefined' ? this._transformValue(value[0]) : null,
            beta: typeof value[1] !== 'undefined' ? this._transformValue(value[1]) : null,
            gamma: typeof value[2] !== 'undefined' ? this._transformValue(value[2]) : null
          };
        } else if (typeof value === 'number' && !isNaN(value) || typeof value === 'string') {
          var referenceValue = this._transformValue(value);
          master = {
            alpha: referenceValue,
            beta: referenceValue,
            gamma: referenceValue
          };
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value && (typeof value.alpha !== 'undefined' || typeof value.beta !== 'undefined' || typeof value.gamma !== 'undefined')) {
          master = {
            alpha: typeof value.alpha !== 'undefined' ? this._transformValue(value.alpha) : null,
            beta: typeof value.beta !== 'undefined' ? this._transformValue(value.beta) : null,
            gamma: typeof value.gamma !== 'undefined' ? this._transformValue(value.gamma) : null
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
      var _this6 = this;

      return bp instanceof Array ? bp.filter(function (p) {
        return typeof p === 'number' && !isNaN(p) || typeof p === 'string' && !isNaN(parseFloat(p)) || p instanceof Array && p.length && p.length <= 4 || (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && p !== null && (typeof p.value !== 'undefined' || typeof p.alpha !== 'undefined' || typeof p.beta !== 'undefined' || typeof p.gamma !== 'undefined');
      }).map(function (p) {

        var prep = typeof p === 'number' || typeof p === 'string' || p instanceof Array || (typeof p === 'undefined' ? 'undefined' : _typeof(p)) === 'object' && p !== null && (typeof p.alpha !== 'undefined' || typeof p.beta !== 'undefined' || typeof p.gamma !== 'undefined') ? {
          value: p
        } : p;

        var hasValue = typeof prep.value !== 'undefined' && prep.value;

        var hasCustomCss = typeof prep.css !== 'undefined' && !!prep.css;

        if (hasCustomCss && typeof prep.css === 'string') {
          prep.css = {
            alpha: prep.css,
            beta: prep.css,
            gamma: prep.css
          };
        }

        if (hasValue) {
          prep.value = _this6._transformValueMatrix(prep.value);
          if (!prep.value) {
            return null;
          }
        }

        var applyAlpha = !!(typeof prep.value.alpha !== 'undefined' && prep.value.alpha);
        var applyBeta = !!(typeof prep.value.beta !== 'undefined' && prep.value.beta);
        var applyGamma = !!(typeof prep.value.gamma !== 'undefined' && prep.value.gamma);

        return {
          css: {
            alpha: applyAlpha ? hasCustomCss && typeof prep.css.alpha !== 'undefined' ? prep.css.alpha : _this6._buildClassName(prep.value.alpha[0] + (prep.value.alpha[1].percent ? 'pc' : ''), 'alpha-') : null,
            beta: applyBeta ? hasCustomCss && typeof prep.css.beta !== 'undefined' ? prep.css.beta : _this6._buildClassName(prep.value.beta[0] + (prep.value.beta[1].percent ? 'pc' : ''), 'beta-') : null,
            gamma: applyGamma ? hasCustomCss && typeof prep.css.gamma !== 'undefined' ? prep.css.gamma : _this6._buildClassName(prep.value.gamma[0] + (prep.value.gamma[1].percent ? 'pc' : ''), 'gamma-') : null,
            alphaLeft: applyAlpha ? hasCustomCss && typeof prep.css.alphaLeft !== 'undefined' ? prep.css.alphaLeft : _this6._buildClassName(prep.value.alpha[0] + (prep.value.alpha[1].percent ? 'pc' : ''), 'alpha-left-') : null,
            alphaRight: applyAlpha ? hasCustomCss && typeof prep.css.alphaRight !== 'undefined' ? prep.css.alphaRight : _this6._buildClassName(prep.value.alpha[0] + (prep.value.alpha[1].percent ? 'pc' : ''), 'alpha-right-') : null,
            betaUp: applyBeta ? hasCustomCss && typeof prep.css.betaUp !== 'undefined' ? prep.css.betaUp : _this6._buildClassName(prep.value.beta[0] + (prep.value.beta[1].percent ? 'pc' : ''), 'beta-up-') : null,
            betaDown: applyBeta ? hasCustomCss && typeof prep.css.betaDown !== 'undefined' ? prep.css.betaDown : _this6._buildClassName(prep.value.beta[0] + (prep.value.beta[1].percent ? 'pc' : ''), 'beta-down-') : null,
            gammaLeft: applyGamma ? hasCustomCss && typeof prep.css.gammaLeft !== 'undefined' ? prep.css.gammaLeft : _this6._buildClassName(prep.value.gamma[0] + (prep.value.gamma[1].percent ? 'pc' : ''), 'gamma-left-') : null,
            gammaRight: applyGamma ? hasCustomCss && typeof prep.css.gammaRight !== 'undefined' ? prep.css.gammaRight : _this6._buildClassName(prep.value.gamma[0] + (prep.value.gamma[1].percent ? 'pc' : ''), 'gamma-right-') : null
          },
          applyAlpha: applyAlpha,
          applyBeta: applyBeta,
          applyGamma: applyGamma,
          callbacks: {
            match: typeof prep.onMatch === 'function' ? prep.onMatch : null,
            unmatch: typeof prep.onUnmatch === 'function' ? prep.onUnmatch : null,
            matchAlpha: typeof prep.onMatchAlpha === 'function' ? prep.onMatchAlpha : null,
            matchBeta: typeof prep.onMatchBeta === 'function' ? prep.onMatchBeta : null,
            matchGamma: typeof prep.onMatchGamma === 'function' ? prep.onMatchGamma : null,
            matchAlphaLeft: typeof prep.onMatchAlphaLeft === 'function' ? prep.onMatchAlphaLeft : null,
            matchAlphaRight: typeof prep.onMatchAlphaRight === 'function' ? prep.onMatchAlphaRight : null,
            matchBetaUp: typeof prep.onMatchBetaUp === 'function' ? prep.onMatchBetaUp : null,
            matchBetaDown: typeof prep.onMatchBetaDown === 'function' ? prep.onMatchBetaDown : null,
            matchGammaLeft: typeof prep.onMatchGammaLeft === 'function' ? prep.onMatchGammaLeft : null,
            matchGammaRight: typeof prep.onMatchGammaRight === 'function' ? prep.onMatchGammaRight : null,
            unmatchAlpha: typeof prep.onUnmatchAlpha === 'function' ? prep.onUnmatchAlpha : null,
            unmatchBeta: typeof prep.onUnmatchBeta === 'function' ? prep.onUnmatchBeta : null,
            unmatchGamma: typeof prep.onUnmatchGamma === 'function' ? prep.onUnmatchGamma : null,
            unmatchAlphaLeft: typeof prep.onUnmatchAlphaLeft === 'function' ? prep.onUnmatchAlphaLeft : null,
            unmatchAlphaRight: typeof prep.onUnmatchAlphaRight === 'function' ? prep.onUnmatchAlphaRight : null,
            unmatchBetaUp: typeof prep.onUnmatchBetaUp === 'function' ? prep.onUnmatchBetaUp : null,
            unmatchBetaDown: typeof prep.onUnmatchBetaDown === 'function' ? prep.onUnmatchBetaDown : null,
            unmatchGammaLeft: typeof prep.onUnmatchGammaLeft === 'function' ? prep.onUnmatchGammaLeft : null,
            unmatchGammaRight: typeof prep.onUnmatchGammaRight === 'function' ? prep.onUnmatchGammaRight : null
          },
          value: hasValue ? prep.value : null
        };
      }).filter(function (pObj) {
        return !!pObj && pObj.value;
      }) : [];
    }

    /**
     * classify
     * @param value
     */

  }, {
    key: 'classify',
    value: function classify() {
      var _this7 = this;

      var value = arguments.length <= 0 || arguments[0] === undefined ? {
        absolute: { alpha: 0, beta: 0, gamma: 0 },
        percent: { alpha: 0, beta: 0, gamma: 0 },
        direction: { alpha: 'stay', beta: 'stay', gamma: 'stay' }
      } : arguments[0];


      var bp = this._options.breakpoints;
      var classes = [];
      var nodes = this._tracky._flattenNodes(this.getNodes());

      if (value && bp.length > 0 && nodes instanceof Array && nodes.length > 0) {
        for (var l = bp.length; l; l--) {
          var _bp = bp[l - 1];

          // Check alpha
          if (_bp.applyAlpha && (!_bp.value.alpha[1].percent && value.absolute.alpha >= _bp.value.alpha[0] || _bp.value.alpha[1].percent && value.percent.alpha >= _bp.value.alpha[0])) {
            classes.push(_bp.css.alpha);

            switch (value.direction.alpha) {
              case 'left':
                classes.push(_bp.css.alphaLeft);
                break;
              case 'right':
                classes.push(_bp.css.alphaRight);
                break;
            }
          }

          // Check beta
          if (_bp.applyBeta && (!_bp.value.beta[1].percent && value.absolute.beta >= _bp.value.beta[0] || _bp.value.beta[1].percent && value.percent.beta >= _bp.value.beta[0])) {
            classes.push(_bp.css.beta);
            switch (value.direction.beta) {
              case 'up':
                classes.push(_bp.css.betaUp);
                break;
              case 'down':
                classes.push(_bp.css.betaDown);
                break;
            }
          }

          // Check gamma
          if (_bp.applyGamma && (!_bp.value.gamma[1].percent && value.absolute.gamma >= _bp.value.gamma[0] || _bp.value.gamma[1].percent && value.percent.gamma >= _bp.value.gamma[0])) {
            classes.push(_bp.css.gamma);
            switch (value.direction.gamma) {
              case 'left':
                classes.push(_bp.css.gammaLeft);
                break;
              case 'right':
                classes.push(_bp.css.gammaRight);
                break;
            }
          }
        }
      }

      if (nodes instanceof Array && nodes.length > 0) {
        nodes.forEach(function (domNode) {
          _this7.attachClasses(domNode, classes);
        });
      }
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
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['alpha', 'beta', 'gamma', 'alphaLeft', 'alphaRight', 'betaUp', 'betaDown', 'gammaLeft', 'gammaRight']), 'match');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['alpha']), 'matchAlpha');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['beta']), 'matchBeta');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gamma']), 'matchGamma');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['alphaLeft']), 'matchAlphaLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['alphaRight']), 'matchAlphaRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['betaUp']), 'matchBetaUp');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['betaDown']), 'matchBetaDown');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gammaLeft']), 'matchGammaLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(added, ['gammaRight']), 'matchGammaRight');
      }

      if (removed instanceof Array && removed.length > 0) {
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['alpha', 'beta', 'gamma', 'alphaLeft', 'alphaRight', 'betaUp', 'betaDown', 'gammaLeft', 'gammaRight']), 'unmatch');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['alpha']), 'unmatchAlpha');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['beta']), 'unmatchBeta');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['gamma']), 'unmatchGamma');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['alphaLeft']), 'unmatchAlphaLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['alphaRight']), 'unmatchAlphaRight');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['betaUp']), 'unmatchBetaUp');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['betaDown']), 'unmatchBetaDown');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['gammaLeft']), 'unmatchGammaLeft');
        this._applyCallbacks(domNode, this._getBpsByClassNames(removed, ['gammaRight']), 'unmatchGammaRight');
      }
    }
  }]);

  return TrackyOrientation;
}(_tracky2.default);

exports.default = TrackyOrientation;