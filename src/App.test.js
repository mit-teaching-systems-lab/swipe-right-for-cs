import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fs from 'fs';

it('renders without crashing', async () => {
  fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
  fetch.mockResponseOnce(fs.readFileSync('./src/files/manipulations.csv').toString());
  const div = document.createElement('div');
  await ReactDOM.render(<App />, div);
});
