import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile, totalSwipes} from './calculations';
import _ from 'lodash';
import {
  isSwipe,
  formatPercent
} from './functions.js';
import './BubbleChart.css';
import DataBubble from './DataBubble';


// Lookup data about a data point with {labels, dataPoints}.
function lookupDataFor(chartData, groupKey) {
  return _.find(chartData.dataPoints, {groupKey});
}
//This component creates a Bubble Chart graph which has student on the vertical axis and possible profiles for any student on the horizontal axis
//circles on the chart represent the percentage of people who swiped right for a given student and profile
class BubbleChart extends Component{
  render() {
    const {
      chartDataForProfileKey,
      chartDataForProfileName
    } = this.props;

    // Compute indexes for per-cell data
    const {consentedInteractions} = this.props;
    const interactions = consentedInteractions.filter(isSwipe);
    const groupedByName = _.groupBy(interactions, row => {
      return row.interaction.turn['profileName'];
    });
    const numInteractions = _.mapValues(groupedByName, row=>{
      return totalSwipes(row,'profileKey');
    });
    const groupedByKey = _.mapValues(groupedByName, row => {
      return percentRightPerProfile(row, 'profileKey');
    });
    
    // Respect sorting and grab student images
    const sortedProfileKeys = _.clone(chartDataForProfileKey.labels).reverse();
    const sortedNames = _.clone(chartDataForProfileName.labels).reverse();
    const pics = _.mapValues(groupedByName, (interactions, names) => {
      return interactions[0].interaction.turn['profileImageSrc']; 
    });

    return (
      <table className="BubbleChart BubbleChart-table">
        <thead>
          <tr>
            <th><div className="BubbleChart-data">Student</div></th>
            <th><div className="BubbleChart-data">Summary</div></th>
            {_.map(sortedProfileKeys, profileKey => {
              const {swipeRightPercent, swipeCount} = lookupDataFor(chartDataForProfileKey, profileKey);
              return <th key={profileKey}>{this.renderSummary(profileKey, swipeCount, swipeRightPercent)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {_.map(sortedNames, profileName => {
            const row = groupedByKey[profileName];
            const {swipeRightPercent, swipeCount} = lookupDataFor(chartDataForProfileName, profileName);
            return (
              <tr key={profileName}>
                <td><img src={pics[profileName]} alt={profileName} height={100} width={100} /></td>
                <td>{this.renderSummary(profileName, swipeCount, swipeRightPercent)}</td>
                {_.map(sortedProfileKeys, profileKey => {
                  return (
                    <td key={profileKey}>
                      <div className="BubbleChart-data">
                        {this.renderCell(profileKey, profileName, this.props, {row, numInteractions})}
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  // Summarize a profile key or name
  renderSummary(captionText, swipeCount, swipeRightPercent) {
    return (
      <div className="Bubble-data">
        {captionText}
        <br />
        n={swipeCount}
        <br />
        {formatPercent(swipeRightPercent)}
      </div>
    );
  }

  // branch
  renderCell(...args) {
    const {cellKey} = this.props;
    if (cellKey === 'numbers') return this.renderCellAsNumbers(...args);
    if (cellKey === 'bubbles') return this.renderCellAsBubble(...args);
  }

  renderCellAsNumbers(profileKey, profileName, props, indexes) {
    const {
      chartDataForProfileKey,
      chartDataForProfileName
    } = props;

    const {row, numInteractions} = indexes;
    const dForKey = lookupDataFor(chartDataForProfileKey, profileKey);
    const dForName = lookupDataFor(chartDataForProfileName, profileName);

    const percentage = row[profileKey] / 100;
    const n = numInteractions[profileName][profileKey];
    return (
      <div>
        <div style={{textAlign: 'right'}}>{this.renderDelta(percentage - dForKey.swipeRightPercent, n, '↑')}</div>
        <div>{this.renderDelta(percentage - dForName.swipeRightPercent, n, '←')}</div>
        <div />
        <div style={{color: '#ccc', textAlign: 'right'}}>{formatPercent(percentage)}</div>
        <div style={{color: '#ccc', textAlign: 'right'}}>n={n}</div>
      </div>
    );
  }

  renderCellAsBubble(profileKey, profileName, props, indexes) {
    const {row, numInteractions} = indexes;
    return (
      <DataBubble
        percentage={row[profileKey]}
        n={numInteractions[profileName][profileKey]} />
    );
  }

  renderDelta(percentage, n, arrow) {
    const threshold = 0.10;
    const opacity = (Math.abs(percentage) < threshold) ? 0.15 : 1;
    const color = (percentage > 0) ? 'green' : 'red';
    const prefix = (percentage >= 0) ? '+' : ''; 
    return <span style={{color, opacity}}>{arrow} {prefix}{formatPercent(percentage)}</span>;
  }
}

BubbleChart.propTypes = {
  consentedInteractions: PropTypes.array.isRequired,
  chartDataForProfileName: PropTypes.object.isRequired,
  chartDataForProfileKey: PropTypes.object.isRequired,
  cellKey: PropTypes.string.isRequired
};

export default BubbleChart;