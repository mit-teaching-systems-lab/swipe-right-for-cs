import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import ReviewPhaseView from './ReviewPhaseView.js';
import {storybookStudents} from './util/fixtures.js';
import {peerResponsesLong} from './util/peerResponsesFixtures.js';

storiesOf('ReviewPhaseView', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <ReviewPhaseView
        workshopCode="foo"
        students={storybookStudents}
        peerResponses={peerResponsesLong}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });