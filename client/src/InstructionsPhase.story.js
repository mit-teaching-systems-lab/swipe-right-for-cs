import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import IntroductionPhase from './IntroductionPhase.js';


storiesOf('IntroductionPhase', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <IntroductionPhase
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });