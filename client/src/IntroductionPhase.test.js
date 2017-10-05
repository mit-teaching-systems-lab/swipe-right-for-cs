import React from 'react';
import ReactDOM from 'react-dom';
import IntroductionPhase from './IntroductionPhase.js';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <IntroductionPhase
      onDone={jest.fn()}
      onInteraction={jest.fn()}
    />, div);
});
