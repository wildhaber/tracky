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
      enable: false,
      breakpoints: []
    },
    edge: {
      enable: false,
      breakpoints: []
    },
    orientation: {
      enable: false,
      face: 'display-up', // 	portrait | portrait-upside-down | landscape-left | landscape-right | display-up | display-down
      breakpoints: []
    }
  }
};