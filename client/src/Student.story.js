import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import {storybookStudents} from './util/fixtures.js';
import Student from './Student.js';

storiesOf('Student', module) //eslint-disable-line no-undef
  .add('normal', () => {
    const student = {
      ...storybookStudents[0],
      argumentTexts: storybookStudents[0].argumentTexts.slice(0, 1)
    };
    return withFrameSwitcher(
      <Student
        {...student}
        onInteraction={(action('onInteraction'))}
        onDone={action('onDone')} />
    );
  });