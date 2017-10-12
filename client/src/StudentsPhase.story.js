import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import {storybookStudents} from './util/fixtures.js';
import StudentsPhase from './StudentsPhase.js';

storiesOf('StudentsPhase', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <StudentsPhase
        students={storybookStudents}
        onInteraction={(action('onInteraction'))}
        onDone={action('onDone')} />
    );
  });