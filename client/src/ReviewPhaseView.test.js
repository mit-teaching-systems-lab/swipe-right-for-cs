import React from 'react';
import ReactDOM from 'react-dom';
import ReviewPhaseView from './ReviewPhaseView.js';
import {storybookStudents} from './util/fixtures.js';
import {peerResponses} from './util/peerResponsesFixtures.js';


function testProps(props = {}) {
  return {
    workshopCode: "foo",
    students: storybookStudents,
    peerResponses: peerResponses,
    onDone: jest.fn(),
    onInteraction: jest.fn(),
    reviewPhaseOptions: {
      showPercents: true,
      copyVersion: 'unknown'
    },
    ...props
  };
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<ReviewPhaseView {...props} />, div);
});


describe('copyVersion option', () => {
  it('has default copy', async () => {
    const div = document.createElement('div');
    const props = testProps();
    ReactDOM.render(<ReviewPhaseView {...props} />, div);
    expect(div.innerHTML).toContain('How would you approach recruiting conversations differently with different students?');
  });

  it('has copy for jlt1', async () => {
    const div = document.createElement('div');
    const props = testProps({
      reviewPhaseOptions: {
        showPercents: true,
        copyVersion: 'jlt1'
      }
    });
    ReactDOM.render(<ReviewPhaseView {...props} />, div);
    expect(div.innerHTML).toContain('Why do you think folks chose different arguments for different students?');
  });
});

describe('showPercents option', () => {
  it('shows them by default', async () => {
    const div = document.createElement('div');
    const props = testProps();
    ReactDOM.render(<ReviewPhaseView {...props} />, div);
    expect(div.querySelectorAll('.ReviewPhaseView-percentage').length).toEqual(8);
  });

  it('can disable them', async () => {
    const div = document.createElement('div');
    const props = testProps({
      reviewPhaseOptions: {
        showPercents: false,
        copyVersion: 'unknown'
      }
    });
    ReactDOM.render(<ReviewPhaseView {...props} />, div);
    expect(div.querySelectorAll('.ReviewPhaseView-percentage').length).toEqual(0);
  });
});