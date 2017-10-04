// Magic file for create-react-app and Jest
// See https://github.com/facebookincubator/create-react-app/pull/548
import raf from 'raf';
global.requestAnimationFrame = raf; // eslint-disable-line no-undef


// https://github.com/jefflau/jest-fetch-mock
global.fetch = require('jest-fetch-mock'); // eslint-disable-line no-undef


// for media queries (eg., react-media)
// via https://github.com/WickyNilliams/enquire.js/issues/82#issuecomment-26990494
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};