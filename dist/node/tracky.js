'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tracky = require('./tracky.options');

var _tracky2 = _interopRequireDefault(_tracky);

var _tracky3 = require('./tracky.scroll');

var _tracky4 = _interopRequireDefault(_tracky3);

var _tracky5 = require('./tracky.edge');

var _tracky6 = _interopRequireDefault(_tracky5);

var _tracky7 = require('./tracky.orientation');

var _tracky8 = _interopRequireDefault(_tracky7);

var _deepAssign = require('deep-assign');

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
    this._listeners = [{ class: _tracky4.default, key: 'scroll' }, { class: _tracky6.default, key: 'edge' }, { class: _tracky8.default, key: 'orientation' }]; // Todo: load from external resources

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


      // Ensure this._selectors is available and an array
      this._selectors = !!this._selectors && !replace ? this._selectors : [];

      // Push Selectors
      this._selectors = this._selectors.concat(this._cleanupSelector(selector));

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

      /* istanbul ignore next */
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

      /* istanbul ignore if */
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

      /* istanbul ignore next */
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (typeof mutation.addedNodes !== 'undefined' && mutation.addedNodes && mutation.addedNodes.length > 0) {
            _this3._handleNodeChanges();
          }
        });
      });

      // Notify me of everything!
      /* istanbul ignore next */
      var observerConfig = {
        childList: true
      };

      /* istanbul ignore next */
      var targetNode = document.body;

      /* istanbul ignore next */
      observer.observe(targetNode, observerConfig);
    }

    /**
     * disable
     * @param feature
     * @returns boolean
     */

  }, {
    key: 'disable',
    value: function disable() {
      var feature = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (!feature) {
        return false;
      }

      var _features = typeof feature === 'string' ? [feature] : feature;

      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
        this._listeners.forEach(function (listener) {
          if ((_features && _features.indexOf(listener.key) > -1 || !_features) && typeof listener.instance !== 'undefined') {
            listener.instance.disable();
          }
        });
      }

      return true;
    }

    /**
     * enable
     * @param feature
     * @returns boolean
     */

  }, {
    key: 'enable',
    value: function enable() {
      var feature = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];


      if (!feature) {
        return false;
      }

      var _features = typeof feature === 'string' ? [feature] : feature;

      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
        this._listeners.forEach(function (listener) {
          if ((_features && _features.indexOf(listener.key) > -1 || !_features) && typeof listener.instance !== 'undefined') {
            listener.instance.enable();
          }
        });
      }

      return true;
    }
  }]);

  return Tracky;
}();

exports.default = Tracky;