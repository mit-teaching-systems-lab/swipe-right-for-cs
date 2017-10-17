import React from 'react';
import ReactDOM from 'react-dom';
import Float from './Float';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Float onClick={jest.fn()}>
      hello
    </Float>
    , div);
});
