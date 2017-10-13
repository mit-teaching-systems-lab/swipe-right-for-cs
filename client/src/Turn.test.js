import React from 'react';
import ReactDOM from 'react-dom';
import Turn from './Turn.js';

function testProps(props = {}) {
  const turn = testTurn(props.turn || {});
  return {
    ...props,
    ...turn,
    swipeHeight: 140,
    onInteraction: jest.fn(),
    onDone: jest.fn()
  };
}

function testTurn() {
  return {
    profileName: "Kevin",
    profileKey: "WM1",
    profileImageSrc: "foo.png",
    profileText: "hello!",
    argumentText: "do it!"
  };
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<Turn {...props} />, div);
});

it('records swipe left interactions correctly', async () => {
  const div = document.createElement('div');
  const turn = testTurn();
  const props = testProps({turn});
  const instance = ReactDOM.render(<Turn {...props} />, div); // eslint-disable-line react/no-render-return-value
  instance.onSwipeLeft();

  const expectedInteration = {
    turn,
    type: "SWIPE_LEFT:a3n0/aAfASRmbKZTpULy8BE9F8fCjsWoczycNGdwf5M="
  };
  expect(props.onInteraction).toHaveBeenCalledWith(expectedInteration);
  expect(props.onDone).toHaveBeenCalledWith(expectedInteration);
});


it('records swipe right interactions correctly', async () => {
  const div = document.createElement('div');
  const turn = testTurn();
  const props = testProps({turn});
  const instance = ReactDOM.render(<Turn {...props} />, div); // eslint-disable-line react/no-render-return-value
  instance.onSwipeRight();

  const expectedInteration = {
    turn,
    type: "SWIPE_RIGHT:JTfoWc+SuahkjxwGte2EYDAKTRv0Tjz2ktX/5vdZm00="
  };
  expect(props.onInteraction).toHaveBeenCalledWith(expectedInteration);
  expect(props.onDone).toHaveBeenCalledWith(expectedInteration);
});
