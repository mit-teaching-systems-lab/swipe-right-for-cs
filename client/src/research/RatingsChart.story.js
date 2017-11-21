import React from 'react';
import { storiesOf } from '@storybook/react';
import RatingsChart from './RatingsChart.js';
import {ratingsChartProps} from './fixtures';

storiesOf('Research/RatingsChart', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return <RatingsChart {...ratingsChartProps} />;
  });