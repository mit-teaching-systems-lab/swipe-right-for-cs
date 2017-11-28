import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './LoginPage';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<LoginPage />, div);
});
