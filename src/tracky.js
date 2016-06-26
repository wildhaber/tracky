var defaultOptions = {
  enableScroll: true,
};

class Tracky {

  constructor(selector = 'body', options = {}) {

    // Register Selectors
    this.registerSelectors(selector, true);

    // Set Options
    this._options = Object.assign(defaultOptions, options);

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

}

export default Tracky;
