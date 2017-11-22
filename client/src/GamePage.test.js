import React from 'react';
import ReactDOM from 'react-dom';
import fs from 'fs';
import GamePage from './GamePage';


it('renders without crashing for Code.org entryway', async () => {
  fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
  fetch.mockResponseOnce(fs.readFileSync('./src/files/sortedVariants.csv').toString());
  const div = document.createElement('div');
  await ReactDOM.render(<GamePage isCodeOrg={true} />, div);
});

it('renders without crashing for demo', async () => {
  fetch.mockResponseOnce(fs.readFileSync('./src/files/profileTemplates.csv').toString());
  fetch.mockResponseOnce(fs.readFileSync('./src/files/sortedVariants.csv').toString());
  const div = document.createElement('div');
  await ReactDOM.render(<GamePage isCodeOrg={false} />, div);
});
