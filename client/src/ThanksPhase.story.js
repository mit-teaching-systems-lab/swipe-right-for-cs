import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import ThanksPhase from './ThanksPhase.js';


storiesOf('ThanksPhase', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <ThanksPhase
        email="foo@mit.edu"
        logs={[]}
        onInteraction={action('onInteraction')} />
    );
  });