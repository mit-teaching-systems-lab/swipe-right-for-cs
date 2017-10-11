import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {withFrameSwitcher} from './util/storybookFrames.js';
import {storybookStudents} from './util/fixtures.js';
import Turn from './Turn.js';


const longProfileText = "Lamar can always get the class cackling with his running commentary, but especially when he starts doing impersonations. Somehow she's able to do it in a way where everyone can laugh.";

function testTurn(props) {
  const student = storybookStudents[0];
  const {profileKey, profileName, profileText, profileImageSrc} = student;
  return {
    profileKey,
    profileName,
    profileText,
    profileImageSrc,
    argumentText: "Computer science is pervasive in every field. No matter what you plan to do when you finish school, knowing something about computer science will help you be better at your job.",
    ...props
  };
}

storiesOf('Turn', module) //eslint-disable-line no-undef
  .add('normal', () => {
    const turn = testTurn();
    return withFrameSwitcher(
      <Turn
        {...turn}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  })
  .add('long text', () => {
    const profileText = longProfileText;
    const turn = testTurn({profileText});
    return withFrameSwitcher(
      <Turn
        {...turn}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  })
  .add('short text', () => {
    const turn = testTurn({
      profileText: "He is awesome.",
      argumentText: "Short argument"
    });
    return withFrameSwitcher(
      <Turn
        {...turn}
        onInteraction={action('onInteraction')}
        onDone={action('onDone')} />
    );
  });