import React from 'react';
import ReactDOM from 'react-dom';
import Bubble from './Bubble';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bubble>hello</Bubble>, div);
});
