import React from 'react';
import ReactDOM from 'react-dom';
import ReviewPhase from './ReviewPhase.js';
import {storybookStudents, peerResponses} from './util/fixtures.js';

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
    onInteraction: jest.fn()
  };
}

it('renders without crashing', async () => {
  mockFetch();
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<ReviewPhase {...props} />, div);
});