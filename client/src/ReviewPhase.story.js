import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import ReviewPhase from './ReviewPhase.js';
import {storybookStudents} from './util/fixtures.js';


storiesOf('ReviewPhase', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <ReviewPhase
        workshopCode="foo"
        students={storybookStudents}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });