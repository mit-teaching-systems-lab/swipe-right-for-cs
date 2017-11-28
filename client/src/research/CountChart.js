import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryGroup
} from 'victory'; 


// Horizontal bar chart showing counts by a string key
class CountChart extends React.Component {
  render() {
    const {chartTitle, countMap} = this.props;
    const labels = Object.keys(countMap);
    const dataPoints = [0].concat(labels.map(label => countMap[label]));

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        padding={{ left: 90, top: 50, right: 90, bottom: 50 }}
      >
        <VictoryLabel text={chartTitle} x={225} y={30} textAnchor="middle"/>
        <VictoryAxis
          dependentAxis
          tickValues={labels.map((label, i) => i + 1)}
          tickFormat={labels}/>
        <VictoryAxis/>
        <VictoryGroup horizontal
          offset={1}
          colorScale={["#999"]}
        >
          <VictoryBar
            data={dataPoints}
            labels={data => data.y === 0 ? '' : data.y} />
        </VictoryGroup>
      </VictoryChart>
    );
  }

}
CountChart.propTypes = {
  countMap: PropTypes.object.isRequired,
  chartTitle: PropTypes.string.isRequired
};

export default CountChart;