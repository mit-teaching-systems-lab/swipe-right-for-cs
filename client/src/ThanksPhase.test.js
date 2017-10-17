import React from 'react';
import ReactDOM from 'react-dom';
import ThanksPhase from './ThanksPhase.js';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<ThanksPhase onInteraction={jest.fn()}/>, div);
});
