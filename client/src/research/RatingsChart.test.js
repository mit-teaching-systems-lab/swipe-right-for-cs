import React from 'react';
import RatingsChart from './RatingsChart';
import ReactTestRenderer from 'react-test-renderer';
import {ratingsChartProps} from './fixtures';

it('renders without crashing', async () => {
  var instance = ReactTestRenderer.create(<RatingsChart {...ratingsChartProps} />);
  expect(instance.toJSON()).toMatchSnapshot();
});
