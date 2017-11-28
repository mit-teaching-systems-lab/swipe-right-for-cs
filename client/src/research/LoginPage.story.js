import React from 'react';
import { storiesOf } from '@storybook/react';
import LoginPage from './LoginPage.js';

storiesOf('Research/LoginPage', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return <LoginPage />;
  });