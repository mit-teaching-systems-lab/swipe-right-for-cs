import React from 'react';
import ReactDOM from 'react-dom';
import ConsentPhase from './ConsentPhase.js';
import {shallow} from 'enzyme';


it('renders without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ConsentPhase
      onDone={jest.fn()}
      onInteraction={jest.fn()}
    />, div);
});

it('renders choices', () => {
  const wrapper = shallow(
    <ConsentPhase
      onDone={jest.fn()}
      onInteraction={jest.fn()} />
  );
  expect(wrapper.contains("I consent")).toEqual(true);
});
