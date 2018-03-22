import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import ReviewPhaseView from './ReviewPhaseView.js';
import {storybookStudents} from './util/fixtures.js';
import {peerResponsesLong} from './util/peerResponsesFixtures.js';

function reviewPhaseOptions(props = {}) {
  return {
    showPercents: true,
    copyVersion: 'unknown',
    ...props
  };
}

storiesOf('ReviewPhaseView', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <ReviewPhaseView
        workshopCode="foo"
        students={storybookStudents}
        peerResponses={peerResponsesLong}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')}
        reviewPhaseOptions={reviewPhaseOptions()} />
    );
  })
  .add('showPercents=false', () => {
    return withFrameSwitcher(
      <ReviewPhaseView
        workshopCode="foo"
        students={storybookStudents}
        peerResponses={peerResponsesLong}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')}
        reviewPhaseOptions={reviewPhaseOptions({showPercents: false})} />
    );
  })
  .add('copyVersion=jlt1', () => {
    return withFrameSwitcher(
      <ReviewPhaseView
        workshopCode="foo"
        students={storybookStudents}
        peerResponses={peerResponsesLong}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')}
        reviewPhaseOptions={reviewPhaseOptions({copyVersion: 'jlt1'})} />
    );
  });