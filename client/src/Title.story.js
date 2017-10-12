import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import Title from './Title.js';


storiesOf('Title', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <Title
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });