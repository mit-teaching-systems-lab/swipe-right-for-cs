import React from 'react';
import ReactDOM from 'react-dom';
import Tappable from './Tappable';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Tappable onClick={jest.fn()}>
      hello
    </Tappable>
    , div);
});
