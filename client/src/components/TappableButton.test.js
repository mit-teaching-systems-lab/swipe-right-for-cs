import React from 'react';
import ReactDOM from 'react-dom';
import TappableButton from './TappableButton';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TappableButton onClick={jest.fn()}>
      hello
    </TappableButton>
    , div);
});
