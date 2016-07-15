'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TrackyEvent = function () {

  /**
   * constructor
   * @param eventKey
   * @param tracky
   * @param options
   * @param globalOptions
   */

  function TrackyEvent(eventKey) {
    var tracky = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var globalOptions = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, TrackyEvent);

    this._key = eventKey;
    this._tracky = tracky;
    this._options = options;
    this._globalOptions = globalOptions;
    this._enabled = options.enable;

    this._options.breakpoints = typeof options.breakpoints !== 'undefined' && options.breakpoints instanceof Array ? this._transformBreakpoints(options.breakpoints) : [];

    this._classNames = this._extractClasses();

    this.start();
  }

  /**
   * getNodes
   * @returns {Array}
   */


  _createClass(TrackyEvent, [{
    key: 'getNodes',
    value: function getNodes() {
      return this._tracky && typeof this._tracky._nodes !== 'undefined' ? this._tracky._nodes : [];
    }

    /**
     * start
     */

  }, {
    key: 'start',
    value: function start() {
      if (this._enabled) {
        this.onStart();
      }
    }

    /**
     * stop
     */

  }, {
    key: 'stop',
    value: function stop() {
      if (this._enabled) {
        this.onStop();
      }
    }

    /**
     * add
     * @param nodes
     */

  }, {
    key: 'add',
    value: function add(nodes) {
      if (this._enabled) {
        this.onAdd(nodes);
      }
    }

    /**
     * remove
     * @param nodes
     */

  }, {
    key: 'remove',
    value: function remove(nodes) {
      if (this._enabled) {
        this.onRemove(nodes);
      }
    }
  }, {
    key: 'enable',
    value: function enable() {
      this._enabled = true;
      this.start();
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.stop();
      this._enabled = false;
    }

    /**
     * attachClasses
     * @param domNode
     * @param classNames
     */

  }, {
    key: 'attachClasses',
    value: function attachClasses(domNode, classNames) {
      var _this = this;

      var available = this._classNames;
      var current = domNode.className;

      if (domNode.classList) {
        (function () {

          var applied = current.replace(/\s+/g, ' ').split(' ').filter(function (c) {
            return available.indexOf(c) > -1;
          });

          var toRemove = applied.filter(function (c) {
            return classNames.indexOf(c) === -1;
          });

          var toApply = classNames.filter(function (c) {
            return applied.indexOf(c) === -1;
          });

          if (toRemove.length) {
            for (var l = toRemove.length; l; l--) {
              domNode.classList.remove(toRemove[l - 1]);
            }
          }

          if (toApply.length) {
            for (var _l = toApply.length; _l; _l--) {
              domNode.classList.add(toApply[_l - 1]);
            }
          }

          if (toRemove.length > 0 || toApply.length > 0) {
            _this.callbackHandler(domNode, toApply, toRemove);
          }
        })();
      }
    }

    /**
     * cleanupClasses
     * @param domNode
     */

  }, {
    key: 'cleanupClasses',
    value: function cleanupClasses(domNode) {

      var available = this._classNames;

      if (domNode.classList) {
        if (available.length) {
          for (var l = available.length; l; l--) {
            domNode.classList.remove(available[l - 1]);
          }
        }
      }
    }

    /**
     * _percentRound
     * @param value
     * @returns {number}
     * @private
     */

  }, {
    key: '_percentRound',
    value: function _percentRound(value) {
      return typeof value === 'number' && !isNaN(value) ? Math.round(parseInt((parseFloat(value) * 100).toFixed(2), 10) / 100) : 0;
    }

    /**
     * _transformValue
     * @param value
     * @returns {*}
     * @private
     */

  }, {
    key: '_transformValue',
    value: function _transformValue(value) {

      var t = null;

      if (typeof value === 'number' && !isNaN(value)) {
        t = [value, { percent: false }];
      } else if (typeof value === 'string') {
        t = value.indexOf('%') == value.length - 1 ? [parseInt(value, 10), { percent: true }] : null;
      } else if (value instanceof Array && value.length === 2 && typeof value[0] === 'number' && !isNaN(value[0]) && !!value[1] && typeof value[1].percent !== 'undefined') {
        t = value;
      }

      return t;
    }

    /**
     * _extractClasses
     * @returns {Array}
     * @private
     */

  }, {
    key: '_extractClasses',
    value: function _extractClasses() {
      var bps = this._options.breakpoints;
      var classArray = [];

      bps.forEach(function (bp) {
        for (var c in bp.css) {
          if (bp.css[c]) {
            classArray.push(bp.css[c]);
          }
        }
      });

      return classArray;
    }

    /**
     * _buildClassName
     * @param value
     * @param modifier
     * @returns {string}
     * @private
     */

  }, {
    key: '_buildClassName',
    value: function _buildClassName(value, modifier) {
      var o = this._globalOptions;
      return o.classPrefix + this._key + '-' + modifier + value + o.classSuffix;
    }

    /**
     * _getBpsByClassName
     * @param className
     * @param findIn
     * @returns {Array | null}
     * @private
     */

  }, {
    key: '_getBpsByClassName',
    value: function _getBpsByClassName() {
      var className = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var findIn = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      return className && typeof className === 'string' && this._options.breakpoints instanceof Array && this._options.breakpoints.length && findIn && findIn instanceof Array && findIn.length ? this._options.breakpoints.filter(function (bp) {
        var cls = [];

        if (findIn instanceof Array && findIn.length) {
          findIn.forEach(function (operator) {
            if (typeof bp.css[operator] === 'string') {
              cls.push(bp.css[operator]);
            }
          });
        }

        return cls.indexOf(className) > -1;
      }) : null;
    }

    /**
     * _getBpsByClassNames
     * @param classNames
     * @param findIn
     * @returns {Array | null}
     * @private
     */

  }, {
    key: '_getBpsByClassNames',
    value: function _getBpsByClassNames() {
      var _this2 = this;

      var classNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var findIn = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      if (classNames instanceof Array && classNames.length > 0 && findIn && findIn instanceof Array && findIn.length) {
        var _ret2 = function () {
          var bps = [];
          classNames.forEach(function (cn) {
            var bp = _this2._getBpsByClassName(cn, findIn);
            if (bp && bp.length > 0) {
              bps = bps.concat(bp);
            }
          });
          return {
            v: bps
          };
        }();

        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
      } else {
        return null;
      }
    }

    /**
     * _applyCallbacks
     * @param domNode
     * @param bps
     * @param keyword
     * @private
     */

  }, {
    key: '_applyCallbacks',
    value: function _applyCallbacks(domNode, bps) {
      var keyword = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      if (typeof keyword === 'string' && bps instanceof Array && bps.length > 0) {
        bps.forEach(function (bp) {
          if (typeof bp.callbacks[keyword] === 'function') {
            bp.callbacks[keyword].call(domNode, bp);
          }
        });
      }
    }
  }]);

  return TrackyEvent;
}();

exports.default = TrackyEvent;