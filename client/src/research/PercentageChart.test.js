import React from 'react';
import PercentageChart from './PercentageChart';
import ReactTestRenderer from 'react-test-renderer';
import {percentageChartProps} from './fixtures';

it('renders without crashing', async () => {
  var instance = ReactTestRenderer.create(<PercentageChart {...percentageChartProps} />);
  expect(instance.toJSON()).toMatchSnapshot();
});
