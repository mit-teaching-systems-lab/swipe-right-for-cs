import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import DiscussPhase from './DiscussPhase.js';
import {storybookStudents} from './util/fixtures.js';


storiesOf('DiscussPhase', module) //eslint-disable-line no-undef
  .add('with text', () => {
    return withFrameSwitcher(
      <DiscussPhase
        students={storybookStudents}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });