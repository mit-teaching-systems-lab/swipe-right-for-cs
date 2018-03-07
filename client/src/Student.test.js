import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
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

function simulateSwipes(props, instance) {
  _.range(0, props.argumentTexts.length).forEach(i => {
    const turn = instance.currentSwipeTurn();
    instance.onSwipeRight(turn);  
  });
}

function testChoiceParams() {
  const choices = ['a','b','c'];
  const choiceText = 'b';
  const choiceIndex = 1;
  return {choices, choiceText, choiceIndex};
}

function simulateChoice(choiceParams, props, instance) {
  const {choices, choiceText, choiceIndex} = choiceParams;
  instance.onChoiceTapped(choices, choiceText, choiceIndex);
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

it('shows the how likely choice, records the interaction correctly, and calls onDone', async () => {
  const div = document.createElement('div');
  const props = testProps();
  const instance = ReactDOM.render(<Student {...props} />, div); // eslint-disable-line react/no-render-return-value
  simulateSwipes(props, instance);
  
  const choiceParams = testChoiceParams();
  simulateChoice(choiceParams, props, instance);
  const student = instance.student();
  expect(props.onInteraction).toHaveBeenCalledTimes(props.argumentTexts.length + 1);
  expect(props.onInteraction).toHaveBeenCalledWith({
    ...choiceParams,
    student,
    type: "STUDENT_RATING:sDNl+SwNNhRcIrujNQtiS0mIX+xHDgVwT44X5EHCeNs="
  });
  expect(props.onDone).toHaveBeenCalled();
});

it('when shouldAskOpenResponse, asks open ended, records interaction correctly, and calls onDone', async () => {
  const div = document.createElement('div');
  const props = testProps({ shouldAskOpenResponse: true });
  const instance = ReactDOM.render(<Student {...props} />, div); // eslint-disable-line react/no-render-return-value

  simulateSwipes(props, instance);
  const choiceParams = testChoiceParams();
  simulateChoice(choiceParams, props, instance);
  expect(props.onDone).not.toHaveBeenCalled();

  const student = instance.student();
  instance.setState({openResponseText: 'foo'});
  instance.onOpenResponseDone('what do you think?');
  expect(props.onInteraction).toHaveBeenCalledTimes(props.argumentTexts.length + 2);
  expect(props.onInteraction).toHaveBeenCalledWith({
    student,
    openResponseText: 'foo',
    prompt: 'what do you think?',
    type: 'OPEN_RESPONSE:0Pt9GRjhQxTY4ZMNHeDFqjX1fEOzNybNvGq/pynJy0U='
  });
  expect(props.onDone).toHaveBeenCalled();
});
