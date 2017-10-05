import React from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';
import App from './App';


it('renders without crashing', async () => {
  fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
  fetch.mockResponseOnce(fs.readFileSync('./src/files/sortedVariants.csv').toString());
  const div = document.createElement('div');
  await ReactDOM.render(<App />, div);
});
