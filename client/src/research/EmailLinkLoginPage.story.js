import React from 'react';
import { storiesOf } from '@storybook/react';
import EmailLinkLoginPage from './EmailLinkLoginPage.js';

storiesOf('Research/EmailLinkLoginPage', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return <EmailLinkLoginPage />;
  });