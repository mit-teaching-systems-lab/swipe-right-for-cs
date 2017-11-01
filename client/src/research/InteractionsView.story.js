import React from 'react';
import { storiesOf } from '@storybook/react';
import {withFrameSwitcher} from '../util/storybookFrames.js';
import InteractionsView from './InteractionsView.js';


storiesOf('InteractionsView', module) //eslint-disable-line no-undef
  .add('normal', () => {
    const db = require('../../../tmp/swipe-right-db.json');
    const {interactions} = db;
    return withFrameSwitcher(
      <InteractionsView interactions={interactions} />
    );
  });