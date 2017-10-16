import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import WorkshopCode from './WorkshopCode.js';


storiesOf('WorkshopCode', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <WorkshopCode
        email="foo@mit.edu"
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });