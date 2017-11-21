import React from 'react';
import PropTypes from 'prop-types';
import __groupBy from 'lodash/groupBy';
import __mapValues from 'lodash/mapValues';
import __flatten from 'lodash/flatten';
import __pick from 'lodash/pick';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryStack
} from 'victory'; 

// Takes the list of dataPoints, and groups them into series
// how Victory expects.
// barsData is in the shape {"0": [{"x": "Chang", "y": 0.12}, ...], ...}
function computeBarsData(dataPoints) {
  const ratingDataPoints = __flatten(dataPoints.map(d => {
    return d.ratings.map(rating => {
      return {
        x: d.groupKey,
        y: rating.percentage,
        ratingValue: rating.ratingValue
      };
    });
  }));

  // Group into series the way Victory expects and strip out extra fields.
  // Victory passes through this data to underlying SVG elements for the
  // chart, which causes React warnings ir they're not SVG attributes.
  const barsData = __mapValues(__groupBy(ratingDataPoints, 'ratingValue'), ds => {
    return ds.map(d => __pick(d, ['x', 'y']));
  });
  const barKeys = Object.keys(barsData);
  return {barsData, barKeys};
}


// Takes a list of interactions, looks at ratings and computes
// percentages based on `groupingKey` and renders a chart showing that.
class RatingsChart extends React.Component {
  render() {
    const {labels, dataPoints, chartTitle} = this.props;
    const {barKeys, barsData} = computeBarsData(dataPoints);
    
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
        <VictoryAxis
          dependentAxis
          tickValues={labels.map((label, index) => index + 1)}
          tickFormat={labels}/>
        <VictoryAxis
          tickValues={[0, .2, .4, .6, .8, 1]}
          tickFormat={t => `${Math.round(t * 100)}%`} />
        <VictoryStack
          horizontal
          colorScale={['#2ca25f', '#99d8c9', '#e5f5f9']} // most likely to least likely
        >
          {barKeys.map(barKey =>
            <VictoryBar
              key={barKey}
              data={barsData[barKey]} />
          )}
        </VictoryStack>
      </VictoryChart>
    );
  }
}
RatingsChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  dataPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartTitle: PropTypes.string.isRequired
};

export default RatingsChart;