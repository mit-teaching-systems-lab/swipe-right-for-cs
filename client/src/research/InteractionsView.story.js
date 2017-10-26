import React from 'react';
import { storiesOf } from '@storybook/react';
import {withFrameSwitcher} from '../util/storybookFrames.js';
import InteractionsView from './InteractionsView.js';

storiesOf('InteractionsView', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(
      <InteractionsView />
    );
  });