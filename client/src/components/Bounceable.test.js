import React from 'react';
import ReactDOM from 'react-dom';
import Bounceable from './Bounceable.js';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Bounceable height={100}>
      hello
    </Bounceable>
  ), div);
});
