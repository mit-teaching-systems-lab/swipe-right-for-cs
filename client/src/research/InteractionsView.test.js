import React from 'react';
import ReactDOM from 'react-dom';
import InteractionsView from './InteractionsView';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  await ReactDOM.render(<InteractionsView interactions={[]} />, div);
});
