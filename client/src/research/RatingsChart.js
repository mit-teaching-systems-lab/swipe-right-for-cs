import React from 'react';
import PropTypes from 'prop-types';
import __groupBy from 'lodash/groupBy';
import __mapValues from 'lodash/mapValues';
import __countBy from 'lodash/countBy';
import __flatten from 'lodash/flatten';
import __sortBy from 'lodash/sortBy';
import __uniq from 'lodash/uniq';
import __pick from 'lodash/pick';
import {InteractionTypes} from '../shared/data.js';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryStack
} from 'victory'; 


function computeChartData(interactions, key) {
  // Filter to rating interactions only
  const ratings = interactions.filter(row => {
    return (row.interaction.type === InteractionTypes.STUDENT_RATING);
  });

  // Flatten into [{groupingKey, ratingValue, percentage}]
  const grouped = __groupBy(ratings, row => row.interaction.student[key]);
  const countByGroupKey = __mapValues(grouped, values => values.length);
  const data = __mapValues(grouped, values => __countBy(values, row => row.interaction.choiceIndex));
  const chartDataPoints = __flatten(Object.keys(data).map(groupingKey => {
    const ratingValues = Object.keys(data[groupingKey]);
    return ratingValues.map(ratingValue => {
      const percentage = data[groupingKey][ratingValue] / countByGroupKey[groupingKey];
      return { x: groupingKey, ratingValue, y: percentage };
    });
  }));

  // Figure out sort order for data points and labels
  const SORT_BY_CHOICE_INDEX = '0';
  const unsortedLabels = __uniq(chartDataPoints.map(d => d.x));
  const labels = __sortBy(unsortedLabels, label => {
    const d = chartDataPoints.find(d => d.ratingValue === SORT_BY_CHOICE_INDEX && d.x === label);
    return -1 * d.y;
  });
  const sortedDataPoints = __sortBy(chartDataPoints, d => labels.indexOf(d.x));

  // Group into series the way Victory expects and strip out extra fields.
  // Victory passes through this data to underlying SVG elements for the
  // chart, which causes React warnings ir they're not SVG attributes.
  const chartData = __mapValues(__groupBy(sortedDataPoints, 'ratingValue'), ds => {
    return ds.map(d => __pick(d, ['x', 'y']));
  });

  return {chartData, labels};
}


// Takes a list of interactions, looks at ratings and computes
// percentages based on `groupingKey` and renders a chart showing that.
class RatingsChart extends React.Component {
  render() {
    const {interactions, groupingKey, chartTitle} = this.props;
    const {chartData, labels} = computeChartData(interactions, groupingKey);

    const keys = Object.keys(chartData);
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{
          x: [0, 1],
          y: [0, labels.length]
        }}
        padding={{ left: 90, top: 50, right: 50, bottom: 50 }}
      >
        <VictoryLabel text={chartTitle} x={225} y={30} textAnchor="middle"/>
        <VictoryAxis dependentAxis tickValues={labels} />
        <VictoryAxis
          tickValues={[0, .2, .4, .6, .8, 1]}
          tickFormat={t => `${Math.round(t * 100)}%`} />
        <VictoryStack
          horizontal
          colorScale={['#e5f5f9', '#99d8c9', '#2ca25f']}
        >
          {keys.map(key =>
            <VictoryBar
              key={key}
              data={chartData[key]} />
          )}
        </VictoryStack>
      </VictoryChart>
    );
  }
}
RatingsChart.propTypes = {
  interactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  groupingKey: PropTypes.string.isRequired,
  chartTitle: PropTypes.string.isRequired
}

export default RatingsChart;