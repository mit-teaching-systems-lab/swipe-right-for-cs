// Magic file for create-react-app and Jest
// See https://github.com/facebookincubator/create-react-app/pull/548
import raf from 'raf';
global.requestAnimationFrame = raf; // eslint-disable-line no-undef


// https://github.com/jefflau/jest-fetch-mock
global.fetch = require('jest-fetch-mock'); // eslint-disable-line no-undef