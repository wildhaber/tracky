# tracky.js v0.0.1
[![CircleCI](https://circleci.com/gh/wildhaber/tracky/tree/master.svg?style=svg&circle-token=98f9cc03cf867906c42e92903c8afd2072651d91)](https://circleci.com/gh/wildhaber/tracky/tree/master)

tracky.js is a helper streamlining user interaction into css-classes. This means tracky handles user interaction like scrolling, device orientation changes or mouse movements on defined breakpoints into css classes.

##Install && Getting started

Node
```
npm install tracky --save
```

Example usage ES2015:
```
import Tracky from 'tracky';

let bodyTracker = new Tracky('body', { options: 'example' });
```

Example usage ES5:
```
<script src='../path-to-node-modules/tracky/dist/tracky.min.js'>

<script>
  var _Tracky = Tracky.default;
  var bodyTracker = new Tracky('body', { options: 'example' });
</script>
```

###Features

**Event Tracker**
Tracking a scroll event on defined breakpoints or within a certain range. Including horizontal and vertical scroll.
  
**Cursor-Edge Tracker**
Tracks if a the cursor touches the edge of an element within a defined range. 

**Device orientation Tracker**
Detects device orientation tilting on x/y/z-axis.

**Live bindings**
DOM-changes are on track and will bind and unbind events on a selector when the elements appears or removes. This makes it easy to use in Angular, React or Ionic.

**Debounced events**
Tracker events are debounced by default to avoid unnecessary DOM-rendering.

**ES2015 (ES6)-Modules**
You can easily import the Tracky-Module with ES2015 module-loaders. It also have a backward compatible version for ES5-Support.

**Vanilla JS**
Written in plain Javascript without the need of jQuery.