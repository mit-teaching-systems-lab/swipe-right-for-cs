import React from 'react';
import { storiesOf } from '@storybook/react';
import PercentageChart from './PercentageChart.js';
import {percentageChartProps} from './fixtures';

storiesOf('Research/PercentageChart', module) //eslint-disable-line no-undef
  .add('normal', () => {
    return <PercentageChart {...percentageChartProps} />;
  });