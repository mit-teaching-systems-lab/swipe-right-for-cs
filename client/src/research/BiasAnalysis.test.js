import React from 'react';
import BiasAnalysis from './BiasAnalysis';
import ReactTestRenderer from 'react-test-renderer';

it('renders without crashing', async () => {
  var instance = ReactTestRenderer.create(<BiasAnalysis consentedInteractions={[]} />);
  expect(instance.toJSON()).toMatchSnapshot();
});
