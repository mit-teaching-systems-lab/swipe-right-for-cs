import React from 'react';
import ReactDOM from 'react-dom';
import Student from './Student.js';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Student
      profileName="Kevin"
      profileImageSrc="foo.png"
      profileText="Kevin likes trees."
      argumentTexts={["Because it's fun", "Because it's cool"]}
      onDone={jest.fn()}
      onInteraction={jest.fn()}
    />, div);
});
