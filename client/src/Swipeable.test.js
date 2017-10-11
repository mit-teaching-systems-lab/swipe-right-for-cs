import React from 'react';
import ReactDOM from 'react-dom';
import Swipeable from './Swipeable.js';

function testProps(props = {}) {
  return {
    ...props,
    children: <div>hello</div>,
    height: 100,
    onSwipeRight: jest.fn(),
    onSwipeLeft: jest.fn()
  };
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<Swipeable {...props} />, div);
});

it('records interactions correctly', async () => {
  const div = document.createElement('div');
  const props = testProps();
  const instance = ReactDOM.render(<Swipeable {...props} />, div); // eslint-disable-line react/no-render-return-value

  expect(instance.state.swipeIndex).toEqual(1);
  instance.onChangeIndex(0);
  instance.onTransitionEnd();
  expect(props.onSwipeLeft).not.toHaveBeenCalled();
  expect(props.onSwipeRight).toHaveBeenCalled();
});
