import React from 'react';
import ReactDOM from 'react-dom';
import WorkshopCode from './WorkshopCode.js';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <WorkshopCode
      onDone={jest.fn()}
      onInteraction={jest.fn()}
    />, div);
});
