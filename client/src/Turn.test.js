import React from 'react';
import ReactDOM from 'react-dom';
import Turn from './Turn.js';

function testProps(props = {}) {
  return {
    ...props,
    profileName: 'Kevin',
    profileImageSrc: 'foo.png',
    profileText: 'hello!',
    argumentText: 'do it!',
    onInteraction: jest.fn(),
    onDone: jest.fn()
  };
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<Turn {...props} />, div);
});

it('records swipe left interactions correctly', async () => {
  const div = document.createElement('div');
  const props = testProps();
  const instance = ReactDOM.render(<Turn {...props} />, div); // eslint-disable-line react/no-render-return-value
  instance.onSwipeLeft();

  const expectedInteration = {
    "type": "SWIPE_LEFT",
    "turn": {
      "profileName": "Kevin",
      "profileImageSrc": "foo.png",
      "profileText": "hello!",
      "argumentText": "do it!"
    }
  };
  expect(props.onInteraction).toHaveBeenCalledWith(expectedInteration);
  expect(props.onDone).toHaveBeenCalledWith(expectedInteration);
});


it('records swipe right interactions correctly', async () => {
  const div = document.createElement('div');
  const props = testProps();
  const instance = ReactDOM.render(<Turn {...props} />, div); // eslint-disable-line react/no-render-return-value
  instance.onSwipeRight();

  const expectedInteration = {
    "type": "SWIPE_RIGHT",
    "turn": {
      "profileName": "Kevin",
      "profileImageSrc": "foo.png",
      "profileText": "hello!",
      "argumentText": "do it!"
    }
  };
  expect(props.onInteraction).toHaveBeenCalledWith(expectedInteration);
  expect(props.onDone).toHaveBeenCalledWith(expectedInteration);
});
