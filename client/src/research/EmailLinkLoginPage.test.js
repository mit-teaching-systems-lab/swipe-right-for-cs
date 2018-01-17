import React from 'react';
import ReactDOM from 'react-dom';
import EmailLinkLoginPage from './EmailLinkLoginPage';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<EmailLinkLoginPage />, div);
});
