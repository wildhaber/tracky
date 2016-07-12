import defaultOptions from './tracky.options';
import TrackyScroll from './tracky.scroll';
import TrackyEdge from './tracky.edge';
import TrackyOrientation from './tracky.orientation';
import _extend from 'deep-assign';

class Tracky {

  constructor(selector = 'body', options = {}) {

    // Register Selectors
    this.registerSelectors(selector, true);

    // Set Options
    this._options = _extend(defaultOptions, options);

    // Set nodes
    this._nodes = [];

    // Set Listeners
    this._listeners = [
      {class: TrackyScroll, key: 'scroll'},
      {class: TrackyEdge, key: 'edge'},
      {class: TrackyOrientation, key: 'orientation'},
    ]; // Todo: load from external resources

    this._bindListeners();
    this._startGlobalWatcher();

  }

  /**
   * registerSelectors - updates the querySelectors for DOM listeners
   * @param selector
   * @param replace
   * @returns {Array}
   */
  registerSelectors(selector, replace = false) {

    // Ensure this._selectors is available and an array
    this._selectors = (!!this._selectors && !replace) ? this._selectors : [];

    // Push Selectors
    this._selectors = this._selectors.concat(
      this._cleanupSelector(selector)
    );

    // Cleanup Unique selectors
    this._selectors = this._selectors.filter(
      (value, index, self) => {
        return self.indexOf(value) === index;
      }
    );

    // Register Nodes
    this._handleNodeChanges();

    return this._selectors;

  }

  /**
   * addSelector
   * @param selector
   * @returns {Tracky}
   */
  addSelector(selector = null) {
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
  removeSelector(selector = null) {

    if (selector) {

      let _s = (selector instanceof Array) ? selector : [selector];
      let _found = 0;

      this._selectors = this._selectors.filter(
        (li) => {
          let _in = (_s.indexOf(li) > -1);
          if (_in) {
            _found++;
          }
          return !_in;
        }
      );

      if (_found > 0) {
        this._handleNodeChanges();
      }

    }

    return this;

  }

  /**
   * refreshNodes - assign DOM nodes
   * @returns {Array}
   */
  refreshNodes() {

    /* istanbul ignore next */
    this._nodes = this._selectors.map(
      (selector) => {
        return (typeof document !== 'undefined' && typeof document.querySelectorAll !== 'undefined') ?
          document.querySelectorAll(
            selector
          ) : null;
      }
    );

    return this._nodes;

  }

  /**
   * getNodesCount
   * @returns {number}
   */
  getNodesCount() {
    let counter = 0;
    if (typeof this._nodes !== 'undefined' && this._nodes.length > 0) {
      for (let l = this._nodes.length; l; l--) {
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
  _cleanupSelector(selector = null) {
    let selArray = (selector instanceof Array) ? selector : [selector];
    return selArray.filter(
      (s) => {
        return (
          (typeof s === 'string') && !!s &&
          s.charAt(0) !== '-'
        );
      }
    );
  }

  /**
   * _getEventsOptions
   * @param evt
   * @returns {Object}
   * @private
   */
  _getEventsOptions(evt = null) {
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
  _bindListeners() {
    if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length)
      this._listeners.forEach(
        (l) => {
          let options = this._getEventsOptions(l.key);
          if (typeof options.enable !== 'undefined' && options.enable === true) {
            l.instance = new l.class(l.key, this, options, this._options);
          }
        }
      );
  }

  /**
   * _flattenNodes
   * @param nodes
   * @returns {Array}
   * @private
   */
  _flattenNodes(nodes = null) {

    let flatten = [];
    let _nodes = nodes || ((typeof this._nodes !== 'undefined' && this._nodes) ? this._nodes : []);
    if (
      _nodes instanceof Array &&
      _nodes.length
    ) {
      _nodes.forEach(
        (n) => {
          if (
            n &&
            n.length &&
            typeof n.forEach !== 'undefined'
          ) {
            n.forEach(
              (_n) => {
                if (flatten.indexOf(_n) === -1) {
                  flatten.push(_n);
                }
              }
            );
          }
        }
      );
    }
    return flatten;
  }

  /**
   * findNodeDiff
   * @param prior
   * @param current
   * @returns {{added: *, removed: *, changes: *}}
   */
  findNodeDiff(prior, current) {

    let priorFlatten = Object.freeze(this._flattenNodes(prior));
    let currentFlatten = Object.freeze(this._flattenNodes(current));

    let newlyAdded = currentFlatten.filter(
      (n) => {
        return (priorFlatten.indexOf(n) === -1);
      }
    );

    let removed = priorFlatten.filter(
      (n) => {
        return (currentFlatten.indexOf(n) === -1);
      }
    );

    return {
      added: newlyAdded,
      removed: removed,
      changes: (newlyAdded.length + removed.length)
    };
  }

  /**
   * _handleNodeChanges
   * @private
   */
  _handleNodeChanges() {

    let priorNodes = (this._nodes) ? Object.freeze(this._nodes) : [];
    this.refreshNodes();
    let currentNodes = (this._nodes) ? Object.freeze(this._nodes) : [];

    let diffNodes = this.findNodeDiff(priorNodes, currentNodes);

    /* istanbul ignore if */
    if (diffNodes.changes > 0) {

      if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
        this._listeners.forEach(
          (listener) => {
            if (typeof listener.instance !== 'undefined') {
              if (diffNodes.added.length) {
                listener.instance.add(diffNodes.added);
              }
              if (diffNodes.removed.length) {
                listener.instance.remove(diffNodes.removed);
              }
            }
          }
        );
      }

    }

  }

  /**
   * _startGlobalWatcher
   * @private
   */
  _startGlobalWatcher() {

    if (typeof MutationObserver === 'undefined') {
      return;
    }

    /* istanbul ignore next */
    var observer = new MutationObserver(
      (mutations) => {
        mutations.forEach(
          (mutation) => {
            if (
              typeof mutation.addedNodes !== 'undefined' &&
              mutation.addedNodes &&
              mutation.addedNodes.length > 0
            ) {
              this._handleNodeChanges();
            }
          }
        );
      }
    );

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
  disable(feature = null) {

    if(!feature) {
      return false;
    }

    let _features = (typeof feature === 'string') ? [feature] : feature;

    if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
      this._listeners.forEach(
        (listener) => {
          if ((
              (
                _features &&
                _features.indexOf(listener.key) > -1
              ) || !_features
            )
            &&
            typeof listener.instance !== 'undefined'
          ) {
            listener.instance.disable();
          }
        }
      );
    }

    return true;

  }


  /**
   * enable
   * @param feature
   * @returns boolean
   */
  enable(feature = null) {

    if(!feature) {
      return false;
    }

    let _features = (typeof feature === 'string') ? [feature] : feature;

    if (typeof this._listeners !== 'undefined' && this._listeners && this._listeners.length) {
      this._listeners.forEach(
        (listener) => {
          if ((
              (
                _features &&
                _features.indexOf(listener.key) > -1
              ) || !_features
            )
            &&
            typeof listener.instance !== 'undefined'
          ) {
            listener.instance.enable();
          }
        }
      );
    }

    return true;

  }

}

export default Tracky;
