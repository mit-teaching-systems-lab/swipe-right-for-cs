import React from 'react';
import ReactDOM from 'react-dom';
import DiscussPhase from './DiscussPhase.js';
import {storybookStudents} from './util/fixtures.js';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DiscussPhase
      students={storybookStudents}
      onDone={jest.fn()}
      onInteraction={jest.fn()}
    />, div);
});
