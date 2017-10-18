import React from 'react';
import ReactDOM from 'react-dom';
import Student from './Student.js';


function testProps(props = {}) {
  return {
    ...props,
    profileName: "Kevin",
    profileKey: "WM1",
    profileImageSrc: "WM1.png",
    profileText: "Kevin likes trees.",
    argumentTexts: ["Because it's fun", "Because it's cool"],
    onDone: jest.fn(),
    onInteraction: jest.fn(),
  };
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<Student {...props} />, div);
});

it('records swipe left interactions correctly', async () => {
  const div = document.createElement('div');
  const props = testProps();
  const instance = ReactDOM.render(<Student {...props} />, div); // eslint-disable-line react/no-render-return-value
  const turn = instance.currentSwipeTurn();
  instance.onSwipeLeft(turn);
  const expectedInteration = {
    turn,
    type: "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
  };
  expect(props.onInteraction).toHaveBeenCalledWith(expectedInteration);
});

it('records swipe right interactions correctly', async () => {
  const div = document.createElement('div');
  const props = testProps();
  const instance = ReactDOM.render(<Student {...props} />, div); // eslint-disable-line react/no-render-return-value
  const turn = instance.currentSwipeTurn();
  instance.onSwipeRight(turn);
  const expectedInteration = {
    turn,
    type: "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
  };
  expect(props.onInteraction).toHaveBeenCalledWith(expectedInteration);
});
