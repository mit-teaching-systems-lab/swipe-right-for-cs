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


describe('/', () => {
  it('redirects to /start for now', () => {

  });
});

describe('/start', () => {
  it('warns about Code Studio', () => {
    // render() {
    //  if (!identifier) return <Warn>;
    //  if (!workshopCode) return <WorkshopCode>;
     // return <Game {...{identifier, workshopCode}} />;
  });

  it('lets users continue anyway', () => {
    // render() {
    //  if (!identifier) return <Warn>;
    //  if (!workshopCode) return <WorkshopCode>;
     // return <Game {...{identifier, workshopCode}} />;
  });
});

describe('/workshop', () => {
  it('asks for the workshop code', () => {
    // render() {
    //  if (!workshopCode) return <WorkshopCode>;
    //  return <Game {...{identifier, workshopCode}} />;
    }
  });  
})

describe('/play', () => {
  it('starts game with random workshop code and unknown identifier', () => {
    // render() {
    //  return <Game {...{unknownIdentifier, randomWorkshopCode}} />;
    // }
  }
});