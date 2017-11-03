import React from 'react';
import { storiesOf } from '@storybook/react';
import InteractionsView from './InteractionsView.js';


storiesOf('InteractionsView', module) //eslint-disable-line no-undef
  .add('normal', () => {
    const db = require('../../../tmp/swipe-right-db.json');
    const {interactions} = db;
    return <InteractionsView interactions={interactions} />;
  });