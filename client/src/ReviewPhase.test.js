import React from 'react';
import ReactDOM from 'react-dom';
import ReviewPhase from './ReviewPhase.js';
import {storybookStudents} from './util/fixtures.js';
import {peerResponses} from './util/peerResponsesFixtures.js';


function mockFetch() {
  fetch.mockResponseOnce(JSON.stringify({
    status: 'ok',
    rows: peerResponses
  }));
}

function testProps() {
  return {
    workshopCode: "foo",
    students: storybookStudents,
    onDone: jest.fn(),
    onInteraction: jest.fn(),
    reviewPhaseOptions: {
      showPercents: true,
      copyVersion: 'unknown'
    }
  };
}

it('renders without crashing', async () => {
  mockFetch();
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<ReviewPhase {...props} />, div);
});