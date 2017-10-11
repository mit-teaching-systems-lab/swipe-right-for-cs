import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import {storybookStudents} from './util/fixtures.js';
import Turn from './Turn.js';


storiesOf('Turn', module) //eslint-disable-line no-undef
  .add('with text', () => {
    const student = storybookStudents[0];
    const {profileKey, profileName, profileText, profileImageSrc} = student;
    const turn = {
      profileKey,
      profileName,
      profileText,
      profileImageSrc,
      argumentText: "Computer science is pervasive in every field. No matter what you plan to do when you finish school, knowing something about computer science will help you be better at your job."
    };

    return withFrameSwitcher(
      <Turn
        {...turn}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });