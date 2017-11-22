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

function renderTestCase(moreProps = {}) {
  const div = document.createElement('div');
  const props = testProps(moreProps);
  const instance = ReactDOM.render(<Swipeable {...props} />, div); // eslint-disable-line react/no-render-return-value
  return {div, props, instance};
}

it('renders without crashing', async () => {
  const div = document.createElement('div');
  const props = testProps();
  ReactDOM.render(<Swipeable {...props} />, div);
});

it('records interactions correctly', async () => {
  const {props, instance} = renderTestCase();
  expect(instance.state.swipeIndex).toEqual(1);

  instance.onChangeIndex(0);
  instance.onTransitionEnd();
  expect(props.onSwipeLeft).not.toHaveBeenCalled();
  expect(props.onSwipeRight).toHaveBeenCalled();
});

// We can't directly test that the swipe prop functions are called,
// since they're trigged by the `onTransitionEnd` methods which rely on
// CSS transition events that aren't supported in the test environment.
//
// jsdom doesn't support the TransitionEnd property.  SwipeableViews
// uses 'dom-helpers' to map event names to vendor-aware names, and
// it can't find the transition event so SwipeableViews ends up
// calling addEventListener with an undefined event name.
describe('handles keyboard navigation correctly', () => {
  it('on left arrow', async () => {
    const {instance} = renderTestCase();
    instance.onKeyDown({which: 37 });
    expect(instance.state.swipeIndex).toEqual(2);
  });

  it('on right arrow', async () => {
    const {instance} = renderTestCase();
    instance.onKeyDown({which: 39 });
    expect(instance.state.swipeIndex).toEqual(0);
  });

  it('ignores after initial swipe', async () => {
    const {instance} = renderTestCase();
    instance.onKeyDown({which: 39 });
    expect(instance.state.swipeIndex).toEqual(0);
    instance.onKeyDown({which: 39 });
    expect(instance.state.swipeIndex).toEqual(0);
  });
});
