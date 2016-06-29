import defaultOptions from './tracky.options';
import TrackyScroll from './tracky.scroll';
import _extend from 'deep-assign';

class Tracky {

  constructor(selector = 'body', options = {}) {

    // Register Selectors
    this.registerSelectors(selector, true);

    // Set Options
    this._options = _extend(defaultOptions, options);

    // Set Listeners
    this._listeners = [{class: TrackyScroll, key: 'scroll'}]; // Todo: load from external resources

    this._bindListeners();

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
    this.refreshNodes();

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
        this.refreshNodes();
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

  _getEventsOptions(evt = null) {
    if (evt) {
      if (typeof this._options.events[evt] !== 'undefined') {
        return this._options.events[evt];
      }
    } else {
      return {};
    }
  }

  _bindListeners() {
    console.log(this._listeners);
    console.log(this._options);
    this._listeners.forEach(
      (l) => {
        let options = this._getEventsOptions(l.key);
        console.log(options);
        if (typeof options.enabled !== 'undefined' && options.enabled === true) {
          l.instance = new l.class(l.key, this, options, this._options);
        }
      }
    );
  }

}

export default Tracky;
