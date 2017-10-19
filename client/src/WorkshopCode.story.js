import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import WorkshopCode from './WorkshopCode.js';

function testProps(props) {
  return {
    ...props,
    email: "foo@mit.edu",
    onInteraction: action('onInteraction'),
    onDone: action('onDone')
  };
}

storiesOf('WorkshopCode', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return withFrameSwitcher(<WorkshopCode {...testProps()} />);
  })
  .add('shouldWarnAboutCodeStudio', () => {
    return withFrameSwitcher(
      <WorkshopCode
        shouldWarnAboutCodeStudio={true}
        {...testProps()} />
    );
  });