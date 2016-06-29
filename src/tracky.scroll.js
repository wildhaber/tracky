import TrackyEvent from './tracky.event';

class TrackyScroll extends TrackyEvent {

  /**
   * _listener
   * @param domNode
   * @private
   */
  _listener(domNode) {

    let position = this._getScrollPosition(domNode);

    this.classify(
      domNode, {
        absolute: position.absolute.top,
        percent: position.percent.top
      }
    );

  }

  /**
   * bindEvent
   * @param domNode
   */
  bindEvent(domNode) {

    domNode.addEventListener(
      'scroll',
      this._bindListener
    );

    this._listener(domNode);

  }

  /**
   * _percentRound
   * @param value
   * @returns {number}
   * @private
   */
  _percentRound(value) {
    return parseInt((parseFloat(value.toFixed(2)) * 100), 10);
  }

  /**
   * _getScrollPosition
   * @param domNode
   * @returns {*}
   * @private
   */
  _getScrollPosition(domNode) {
    if (this._isBody(domNode)) {

      let doc = document.documentElement;
      let b = document.body;

      return {
        absolute: {
          top: doc.scrollTop || b.scrollTop,
          left: doc.scrollLeft || b.scrollLeft,
        },
        percent: {
          top: this._percentRound(
            doc.scrollTop || b.scrollTop / ((doc.scrollHeight || b.scrollHeight) - doc.clientHeight)
          ),
          left: this._percentRound(
            (!!doc.scrollLeft || !!b.scrollLeft) ? (doc.scrollLeft || b.scrollLeft / ((doc.scrollWidth || b.scrollWidth) - doc.clientWidth)) : 0
          ),
        }
      };

    } else {
      return {
        absolute: {
          top: domNode.scrollTop,
          left: domNode.scrollLeft,
        },
        percent: {
          top: this._percentRound(((domNode.scrollTop) / (domNode.scrollHeight - domNode.offsetHeight))),
          left: this._percentRound(
            (domNode.scrollLeft) ? ((domNode.scrollLeft) / (domNode.scrollWidth - domNode.offsetWidth)) : 0
          ),
        }
      };
    }
  }

  /**
   * bindBodyEvent
   */
  bindBodyEvent() {

    window.addEventListener(
      'scroll', this._bindBodyListener
    );

    this._listener(document.body);

  }

  /**
   * unbindBodyEvent
   */
  unbindBodyEvent() {
    window.removeEventListener(
      'scroll',
      this._bindBodyListener
    );

  }

  /**
   * unbindEvent
   * @param domNode
   */
  unbindEvent(domNode) {
    domNode.removeEventListener(
      'scroll', this._bindListener
    );
  }

  /**
   * _isBody
   * @param domNode
   * @returns {boolean}
   * @private
   */
  _isBody(domNode) {
    return (domNode.nodeName === 'BODY');
  }

  /**
   * bindEvents
   */
  bindEvents() {

    this.getNodes().forEach(
      (n) => {
        if (n) {
          n.forEach(
            (_n) => {
              if (this._isBody(_n)) {
                this.bindBodyEvent();
              } else {
                this.bindEvent(_n);
              }
            }
          );
        }
      }
    );
  }

  /**
   * unbindEvents
   */
  unbindEvents() {

    this.getNodes().forEach(
      (n) => {
        if (n) {
          n.forEach(
            (_n) => {
              if (this._isBody(_n)) {
                this.unbindBodyEvent();
              } else {
                this.unbindEvent(_n);
              }
            }
          );
        }
      }
    );
  }


  /**
   * onStart
   */
  onStart() {

    // Ugly but necessary to keep this-context combined with eventListener add/remove
    this._bindListener = (e) => {
      this._listener(e.target);
    };

    // It becomes even worse if we consider that body/window needs a separate handling
    // but necessary to keep this-context combined with eventListener add/remove
    var last_known_scroll_position = 0;
    var ticking = false;

    this._bindBodyListener = (e) => {

      last_known_scroll_position = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(
          () => {
            this._listener(e.target.activeElement);
            ticking = false;
          }
        );
      }

      ticking = true;

    };

    this.bindEvents();

  }

  /**
   * onStop
   */
  onStop() {
    this.unbindEvents();
  }

  /**
   * onAdd
   * @param nodes
   */
  onAdd(nodes) {
    nodes.forEach(
      (_n) => {
        if (this._isBody(_n)) {
          this.bindBodyEvent();
        } else {
          this.bindEvent(_n);
        }
      }
    );
  }

  /**
   * onRemove
   * @param nodes
   */
  onRemove(nodes) {

    nodes.forEach(
      (_n) => {
        if (this._isBody(_n)) {
          this.unbindBodyEvent();
          this.cleanupClasses(document.body);
        } else {
          this.unbindEvent(_n);
          this.cleanupClasses(_n);
        }
      }
    );
  }

}

export default TrackyScroll;
