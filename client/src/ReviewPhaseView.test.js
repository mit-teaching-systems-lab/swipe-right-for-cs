import React from 'react';
import ReactDOM from 'react-dom';
import ReviewPhaseView from './ReviewPhaseView.js';
import {storybookStudents} from './util/fixtures.js';
import {peerResponses} from './util/peerResponsesFixtures.js';


function testProps() {
  return {
    workshopCode: "foo",
    students: storybookStudents,
    peerResponses: peerResponses,
    onDone: jest.fn(),
    onInteraction: jest.fn()
  };
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<ReviewPhaseView {...props} />, div);
});
