import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import ReviewPhaseView from './ReviewPhaseView.js';
import {storybookStudents, peerResponses} from './util/fixtures.js';


storiesOf('ReviewPhaseView', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <ReviewPhaseView
        workshopCode="foo"
        students={storybookStudents}
        peerResponses={peerResponses}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });