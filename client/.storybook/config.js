import { configure } from '@storybook/react';

function loadStories() {
  require('../src/DiscussPhase.story.js');
  require('../src/ConsentPhase.story.js');
  require('../src/Turn.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module); //eslint-disable-line no-undef