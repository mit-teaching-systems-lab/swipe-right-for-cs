import React from 'react';
import ReactDOM from 'react-dom';
import Interactions from './Interactions';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<Interactions />, div);
});
