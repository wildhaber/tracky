/**
 * tracky.js - a helper module streamlining user interaction into css-classes
 * @version 1.0.0
 * @author Copyright (c) Raphael Wildhaber < https://github.com/wildhaber >
 * @url https://github.com/wildhaber/tracky#readme
 * @license MIT
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-disable */
	
	// Not happy with this solution
	var Tracky = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Tracky"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracky = __webpack_require__(3);
	
	var _tracky2 = _interopRequireDefault(_tracky);
	
	var _tracky3 = __webpack_require__(4);
	
	var _tracky4 = _interopRequireDefault(_tracky3);
	
	var _deepAssign = __webpack_require__(6);
	
	var _deepAssign2 = _interopRequireDefault(_deepAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tracky = function () {
	  function Tracky() {
	    var selector = arguments.length <= 0 || arguments[0] === undefined ? 'body' : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Tracky);
	
	    // Register Selectors
	    this.registerSelectors(selector, true);
	
	    // Set Options
	    this._options = (0, _deepAssign2.default)(_tracky2.default, options);
	
	    // Set nodes
	    this._nodes = [];
	
	    // Set Listeners
	    this._listeners = [{ class: _tracky4.default, key: 'scroll' }]; // Todo: load from external resources
	
	    this._bindListeners();
	    this._startGlobalWatcher();
	  }
	
	  /**
	   * registerSelectors - updates the querySelectors for DOM listeners
	   * @param selector
	   * @param replace
	   * @returns {Array}
	   */
	
	
	  _createClass(Tracky, [{
	    key: 'registerSelectors',
	    value: function registerSelectors(selector) {
	      var replace = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	
	      // Cleanup selector to contain only valid selectors
	      selector = this._cleanupSelector(selector);
	
	      // Ensure this._selectors is available and an array
	      this._selectors = !!this._selectors && !replace ? this._selectors : [];
	
	      // Push Selectors
	      if (selector instanceof Array) {
	        this._selectors = this._selectors.concat(selector);
	      } else if (typeof selector === 'string') {
	        this._selectors.push(selector);
	      }
	
	      // Cleanup Unique selectors
	      this._selectors = this._selectors.filter(function (value, index, self) {
	        return self.indexOf(value) === index;
	      });
	
	      // Register Nodes
	      this._handleNodeChanges();
	
	      return this._selectors;
	    }
	
	    /**
	     * addSelector
	     * @param selector
	     * @returns {Tracky}
	     */
	
	  }, {
	    key: 'addSelector',
	    value: function addSelector() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      if (selector) {
	        this.registerSelectors(selector);
	      }
	      return this;
	    }
	
	    /**
	     * removeSelector
	     * @param selector
	     * @returns {Tracky}
	     */
	
	  }, {
	    key: 'removeSelector',
	    value: function removeSelector() {
	      var _this = this;
	
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	
	      if (selector) {
	        (function () {
	
	          var _s = selector instanceof Array ? selector : [selector];
	          var _found = 0;
	
	          _this._selectors = _this._selectors.filter(function (li) {
	            var _in = _s.indexOf(li) > -1;
	            if (_in) {
	              _found++;
	            }
	            return !_in;
	          });
	
	          if (_found > 0) {
	            _this._handleNodeChanges();
	          }
	        })();
	      }
	
	      return this;
	    }
	
	    /**
	     * refreshNodes - assign DOM nodes
	     * @returns {Array}
	     */
	
	  }, {
	    key: 'refreshNodes',
	    value: function refreshNodes() {
	
	      this._nodes = this._selectors.map(function (selector) {
	        return typeof document !== 'undefined' && typeof document.querySelectorAll !== 'undefined' ? document.querySelectorAll(selector) : null;
	      });
	
	      return this._nodes;
	    }
	
	    /**
	     * getNodesCount
	     * @returns {number}
	     */
	
	  }, {
	    key: 'getNodesCount',
	    value: function getNodesCount() {
	      var counter = 0;
	      if (typeof this._nodes !== 'undefined' && this._nodes.length > 0) {
	        for (var l = this._nodes.length; l; l--) {
	          counter += this._nodes[l - 1].length;
	        }
	      }
	      return counter;
	    }
	
	    /**
	     * cleanupSelector
	     * @returns {Array}
	     * @private
	     */
	
	  }, {
	    key: '_cleanupSelector',
	    value: function _cleanupSelector() {
	      var selector = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      var selArray = selector instanceof Array ? selector : [selector];
	      return selArray.filter(function (s) {
	        return typeof s === 'string' && !!s && s.charAt(0) !== '-';
	      });
	    }
	
	    /**
	     * _getEventsOptions
	     * @param evt
	     * @returns {Object}
	     * @private
	     */
	
	  }, {
	    key: '_getEventsOptions',
	    value: function _getEventsOptions() {
	      var evt = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      if (evt && typeof this._options.events[evt] !== 'undefined') {
	        return this._options.events[evt];
	      } else {
	        return {};
	      }
	    }
	
	    /**
	     * _bindListeners
	     * @private
	     */
	
	  }, {
	    key: '_bindListeners',
	    value: function _bindListeners() {
	      var _this2 = this;
	
	      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) this._listeners.forEach(function (l) {
	        var options = _this2._getEventsOptions(l.key);
	        if (typeof options.enable !== 'undefined' && options.enable === true) {
	          l.instance = new l.class(l.key, _this2, options, _this2._options);
	        }
	      });
	    }
	
	    /**
	     * _flattenNodes
	     * @param nodes
	     * @returns {Array}
	     * @private
	     */
	
	  }, {
	    key: '_flattenNodes',
	    value: function _flattenNodes() {
	      var nodes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	
	      var flatten = [];
	      var _nodes = nodes || (typeof this._nodes !== 'undefined' && this._nodes ? this._nodes : []);
	      if (_nodes instanceof Array && _nodes.length) {
	        _nodes.forEach(function (n) {
	          if (n && n.length && typeof n.forEach !== 'undefined') {
	            n.forEach(function (_n) {
	              if (flatten.indexOf(_n) === -1) {
	                flatten.push(_n);
	              }
	            });
	          }
	        });
	      }
	      return flatten;
	    }
	
	    /**
	     * findNodeDiff
	     * @param prior
	     * @param current
	     * @returns {{added: *, removed: *, changes: *}}
	     */
	
	  }, {
	    key: 'findNodeDiff',
	    value: function findNodeDiff(prior, current) {
	
	      var priorFlatten = Object.freeze(this._flattenNodes(prior));
	      var currentFlatten = Object.freeze(this._flattenNodes(current));
	
	      var newlyAdded = currentFlatten.filter(function (n) {
	        return priorFlatten.indexOf(n) === -1;
	      });
	
	      var removed = priorFlatten.filter(function (n) {
	        return currentFlatten.indexOf(n) === -1;
	      });
	
	      return {
	        added: newlyAdded,
	        removed: removed,
	        changes: newlyAdded.length + removed.length
	      };
	    }
	
	    /**
	     * _handleNodeChanges
	     * @private
	     */
	
	  }, {
	    key: '_handleNodeChanges',
	    value: function _handleNodeChanges() {
	
	      var priorNodes = this._nodes ? Object.freeze(this._nodes) : [];
	      this.refreshNodes();
	      var currentNodes = this._nodes ? Object.freeze(this._nodes) : [];
	
	      var diffNodes = this.findNodeDiff(priorNodes, currentNodes);
	
	      if (diffNodes.changes > 0) {
	
	        if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
	          this._listeners.forEach(function (listener) {
	            if (typeof listener.instance !== 'undefined') {
	              if (diffNodes.added.length) {
	                listener.instance.add(diffNodes.added);
	              }
	              if (diffNodes.removed.length) {
	                listener.instance.remove(diffNodes.removed);
	              }
	            }
	          });
	        }
	      }
	    }
	
	    /**
	     * _startGlobalWatcher
	     * @private
	     */
	
	  }, {
	    key: '_startGlobalWatcher',
	    value: function _startGlobalWatcher() {
	      var _this3 = this;
	
	      if (typeof MutationObserver === 'undefined') {
	        return;
	      }
	
	      var observer = new MutationObserver(function (mutations) {
	        mutations.forEach(function (mutation) {
	          if (typeof mutation.addedNodes !== 'undefined' && mutation.addedNodes && mutation.addedNodes.length > 0) {
	            _this3._handleNodeChanges();
	          }
	        });
	      });
	
	      // Notify me of everything!
	      var observerConfig = {
	        childList: true
	      };
	
	      var targetNode = document.body;
	      observer.observe(targetNode, observerConfig);
	    }
	
	    /**
	     * disable
	     * @param feature
	     */
	
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var feature = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      var _features = typeof feature === 'string' ? [feature] : feature;
	
	      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
	        this._listeners.forEach(function (listener) {
	          if ((_features && _features.indexOf(listener.key) > -1 || !_features) && typeof listener.instance !== 'undefined') {
	            listener.instance.disable();
	          }
	        });
	      }
	    }
	
	    /**
	     * enable
	     * @param feature
	     */
	
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var feature = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	
	      var _features = typeof feature === 'string' ? [feature] : feature;
	
	      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
	        this._listeners.forEach(function (listener) {
	          if ((_features && _features.indexOf(listener.key) > -1 || !_features) && typeof listener.instance !== 'undefined') {
	            listener.instance.enable();
	          }
	        });
	      }
	    }
	  }]);
	
	  return Tracky;
	}();
	
	exports.default = Tracky;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  classPrefix: 'tracky-',
	  classSuffix: '',
	  classGtPrefix: 'gt-',
	  classLtPrefix: 'lt-',
	  classEqPrefix: 'eq-',
	  classBtPrefix: 'bt-',
	  events: {
	    scroll: {
	      enable: true,
	      breakpoints: []
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tracky = __webpack_require__(5);
	
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
	
	      var position = this._getScrollPosition(domNode);
	
	      this.classify(domNode, position);
	    }
	
	    /**
	     * bindEvent
	     * @param domNode
	     */
	
	  }, {
	    key: 'bindEvent',
	    value: function bindEvent(domNode) {
	
	      domNode.addEventListener('scroll', this._bindListener);
	
	      this._listener(domNode);
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
	     * _getScrollPosition
	     * @param domNode
	     * @returns {*}
	     * @private
	     */
	
	  }, {
	    key: '_getScrollPosition',
	    value: function _getScrollPosition(domNode) {
	      if (this._isBody(domNode)) {
	
	        var doc = document.documentElement;
	        var b = document.body;
	
	        return {
	          absolute: {
	            top: doc.scrollTop || b.scrollTop,
	            left: doc.scrollLeft || b.scrollLeft
	          },
	          percent: {
	            top: this._percentRound(doc.scrollTop || b.scrollTop / ((doc.scrollHeight || b.scrollHeight) - doc.clientHeight)),
	            left: this._percentRound(!!doc.scrollLeft || !!b.scrollLeft ? doc.scrollLeft || b.scrollLeft / ((doc.scrollWidth || b.scrollWidth) - doc.clientWidth) : 0)
	          }
	        };
	      } else {
	        return {
	          absolute: {
	            top: domNode.scrollTop,
	            left: domNode.scrollLeft
	          },
	          percent: {
	            top: this._percentRound(domNode.scrollTop / (domNode.scrollHeight - domNode.offsetHeight)),
	            left: this._percentRound(domNode.scrollLeft ? domNode.scrollLeft / (domNode.scrollWidth - domNode.offsetWidth) : 0)
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
	
	      window.addEventListener('scroll', this._bindBodyListener);
	
	      this._listener(document.body);
	    }
	
	    /**
	     * unbindBodyEvent
	     */
	
	  }, {
	    key: 'unbindBodyEvent',
	    value: function unbindBodyEvent() {
	      window.removeEventListener('scroll', this._bindBodyListener);
	    }
	
	    /**
	     * unbindEvent
	     * @param domNode
	     */
	
	  }, {
	    key: 'unbindEvent',
	    value: function unbindEvent(domNode) {
	      domNode.removeEventListener('scroll', this._bindListener);
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
	              _this3.cleanupClasses(document.body);
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
	    value: function onAdd(nodes) {
	      var _this5 = this;
	
	      nodes.forEach(function (_n) {
	        if (_this5._isBody(_n)) {
	          _this5.bindBodyEvent();
	        } else {
	          _this5.bindEvent(_n);
	        }
	      });
	    }
	
	    /**
	     * onRemove
	     * @param nodes
	     */
	
	  }, {
	    key: 'onRemove',
	    value: function onRemove(nodes) {
	      var _this6 = this;
	
	      nodes.forEach(function (_n) {
	        if (_this6._isBody(_n)) {
	          _this6.unbindBodyEvent();
	        } else {
	          _this6.unbindEvent(_n);
	        }
	      });
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
	      var findIn = arguments.length <= 1 || arguments[1] === undefined ? ['eq', 'bt'] : arguments[1];
	
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
	      var _this8 = this;
	
	      var classNames = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	      var findIn = arguments.length <= 1 || arguments[1] === undefined ? ['eq', 'bt'] : arguments[1];
	
	      if (classNames instanceof Array && classNames.length > 0 && findIn && findIn instanceof Array && findIn.length) {
	        var _ret = function () {
	          var bps = [];
	          classNames.forEach(function (cn) {
	            var bp = _this8._getBpsByClassName(cn, findIn);
	            if (bp && bp.length > 0) {
	              bps = bps.concat(bp);
	            }
	          });
	          return {
	            v: bps
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	  }]);
	
	  return TrackyEvent;
	}();
	
	exports.default = TrackyEvent;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObj = __webpack_require__(7);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Sources cannot be null or undefined');
		}
	
		return Object(val);
	}
	
	function assignKey(to, from, key) {
		var val = from[key];
	
		if (val === undefined || val === null) {
			return;
		}
	
		if (hasOwnProperty.call(to, key)) {
			if (to[key] === undefined || to[key] === null) {
				throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
			}
		}
	
		if (!hasOwnProperty.call(to, key) || !isObj(val)) {
			to[key] = val;
		} else {
			to[key] = assign(Object(to[key]), from[key]);
		}
	}
	
	function assign(to, from) {
		if (to === from) {
			return to;
		}
	
		from = Object(from);
	
		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				assignKey(to, from, key);
			}
		}
	
		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(from);
	
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					assignKey(to, from, symbols[i]);
				}
			}
		}
	
		return to;
	}
	
	module.exports = function deepAssign(target) {
		target = toObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			assign(target, arguments[s]);
		}
	
		return target;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (x) {
		var type = typeof x;
		return x !== null && (type === 'object' || type === 'function');
	};


/***/ }
/******/ ]);
//# sourceMappingURL=tracky.js.map