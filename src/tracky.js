import defaultOptions from './tracky.options';
import TrackyScroll from './tracky.scroll';
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
    this._listeners = [{class: TrackyScroll, key: 'scroll'}]; // Todo: load from external resources

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

    // Cleanup selector to contain only valid selectors
    selector = this._cleanupSelector(selector);

    // Ensure this._selectors is available and an array
    this._selectors = (!!this._selectors && !replace) ? this._selectors : [];

    // Push Selectors
    if (selector instanceof Array) {
      this._selectors = this._selectors.concat(selector);
    } else if (typeof selector === 'string') {
      this._selectors.push(selector);
    }

    // Cleanup Unique selectors
    this._selectors = [...new Set(this._selectors)];

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
   * _getEvensOptions
   * @param evt
   * @returns {Object}
   * @private
   */
  _getEventsOptions(evt = null) {
    if (evt) {
      if (typeof this._options.events[evt] !== 'undefined') {
        return this._options.events[evt];
      }
    } else {
      return {};
    }
  }

  /**
   * _bindListeners
   * @private
   */
  _bindListeners() {
    this._listeners.forEach(
      (l) => {
        let options = this._getEventsOptions(l.key);
        if (typeof options.enable !== 'undefined' && options.enable === true) {
          l.instance = new l.class(l.key, this, options, this._options);
        }
      }
    );
  }

  _flattenNodes(nodes = null) {

    let flatten = [];
    let _nodes = nodes || ((typeof this._nodes !== 'undefined') ? this._nodes : []);

    _nodes.forEach(
      (n) => {
        n.forEach(
          (_n) => {
            if(flatten.indexOf(_n) === -1) {
              flatten.push(_n);
            }
          }
        )
      }
    );
    return flatten;
  }

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

  getNodesFingerprint() {
    let fp = '';
    if (typeof this._nodes !== 'undefined') {
      this._nodes.forEach(
        (n) => {
          fp += n.length;
        }
      );
    }
    return fp;
  }

  _handleNodeChanges() {

    let priorNodes = Object.freeze(this._nodes);
    this.refreshNodes();
    let currentNodes = Object.freeze(this._nodes);

    let diffNodes = this.findNodeDiff(priorNodes, currentNodes);

    if (diffNodes.changes > 0) {

      if (typeof this._listeners !== 'undefined' && this._listeners.length) {
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


  _startGlobalWatcher() {

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
    var observerConfig = {
      childList: true
    };

    var targetNode = document.body;
    observer.observe(targetNode, observerConfig);

  }

}

export default Tracky;
