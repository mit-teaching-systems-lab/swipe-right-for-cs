import React from 'react';
import PropTypes from 'prop-types';
import {formatPercent} from './functions';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryGroup
} from 'victory'; 


// Horizontal bar chart showing percentages by a string key
class PercentageChart extends React.Component {
  render() {
    const {chartTitle, percentageMap} = this.props;
    const labels = Object.keys(percentageMap);
    const dataPoints = [0].concat(labels.map(label => percentageMap[label]));

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{
          x: [0, 1],
          y: [0, labels.length]
        }}
        padding={{ left: 90, top: 50, right: 90, bottom: 50 }}
      >
        <VictoryLabel text={chartTitle} x={225} y={30} textAnchor="middle"/>
        <VictoryAxis
          dependentAxis
          tickValues={labels.map((label, i) => i + 1)}
          tickFormat={labels}/>
        <VictoryAxis
          tickValues={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
          tickFormat={t => formatPercent(t)} />
        <VictoryGroup horizontal
          offset={1}
          colorScale={["tomato"]}
        >
          <VictoryBar
            data={dataPoints}
            labels={data => data.y === 0 ? '' : formatPercent(data.y)}
          />
        </VictoryGroup>
      </VictoryChart>
    );
  }

}
PercentageChart.propTypes = {
  percentageMap: PropTypes.object.isRequired,
  chartTitle: PropTypes.string.isRequired
};

export default PercentageChart;