import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import ConsentPhase from './ConsentPhase.js';


storiesOf('ConsentPhase', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <ConsentPhase
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });