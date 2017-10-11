import React from 'react';
import ReactDOM from 'react-dom';
import ConsentPhase from './ConsentPhase.js';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ConsentPhase
      onDone={jest.fn()}
      onInteraction={jest.fn()}
    />, div);
});