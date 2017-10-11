import { configure } from '@storybook/react';

function loadStories() {
  require('../src/DiscussPhase.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);