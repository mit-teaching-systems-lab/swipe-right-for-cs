import { configure } from '@storybook/react';

function loadStories() {
  require('../src/WorkshopCode.story.js');
  require('../src/Title.story.js');
  require('../src/ConsentPhase.story.js');
  require('../src/InstructionsPhase.story.js');
  require('../src/StudentsPhase.story.js');
  require('../src/Turn.story.js');
  require('../src/DiscussPhase.story.js');
  require('../src/ReviewPhaseView.story.js');
  require('../src/ThanksPhase.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module); //eslint-disable-line no-undef