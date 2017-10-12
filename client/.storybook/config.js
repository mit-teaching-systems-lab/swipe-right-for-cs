import { configure } from '@storybook/react';

function loadStories() {
  require('../src/Title.story.js');
  require('../src/ConsentPhase.story.js');
  require('../src/InstructionsPhase.story.js');
  require('../src/StudentsPhase.story.js');
  require('../src/Turn.story.js');
  require('../src/DiscussPhase.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module); //eslint-disable-line no-undef