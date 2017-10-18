import React from 'react';
import ReactDOM from 'react-dom';
import ThanksPhase from './ThanksPhase.js';
import {logs} from './util/fixtures.js';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<ThanksPhase
    logs={logs}
    onInteraction={jest.fn()}/>, div);
});
