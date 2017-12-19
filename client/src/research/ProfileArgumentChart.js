import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile, totalSwipes} from './calculations';
import _ from 'lodash';
import {
  isSwipe,
  formatPercent
} from './functions.js';
import DataBubble from './DataBubble';


// This component creates a table that shows arguments on the vertical axis and
// student profiles on the horizontal axis.
// Circles on the chart represent the percentage of people who swiped right for a given student and profile,
// and coloring represents the confidence of the finding.
class ProfileArgumentChart extends Component{
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

    const argumentsByKey = _.mapValues(_.groupBy(interactions, row => row.interaction.turn.profileKey), interactions => {
      return _.uniq(interactions.map(row => row.interaction.turn.argumentText)).sort();
    });
    console.log(argumentsByKey);

    return (
      <table>
        <thead>
          <tr>
            <th><div className="Bubble-data">Student</div></th>
            <th><div className="Bubble-data">Summary</div></th>
            {_.map(sortedProfileKeys, profileKey => {
              const d = _.find(chartDataForProfileKey.dataPoints, { groupKey: profileKey });
              const {swipeRightPercent, swipeCount} = d;
              return <th key={profileKey}>{this.renderSummary(profileKey, swipeCount, swipeRightPercent)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {_.map(sortedNames, profileName => {
            const row = groupedByKey[profileName];
            const d = _.find(chartDataForProfileName.dataPoints, { groupKey: profileName });
            const {swipeRightPercent, swipeCount} = d;
            return (
              <tr key={profileName}>
                <td><img src={pics[profileName]} alt="" height="100" width="100"/></td>
                <td>{this.renderSummary(profileName, swipeCount, swipeRightPercent)}</td>
                {_.map(sortedProfileKeys, profileKey => {
                  return (
                    <td key={profileKey}>
                      <div className="Bubble-data">
                        <DataBubble
                          percentage={row[profileKey]}
                          n={numInteractions[profileName][profileKey]} />
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
}

ProfileArgumentChart.propTypes = {
  consentedInteractions: PropTypes.array.isRequired,
  chartDataForProfileName: PropTypes.object.isRequired,
  chartDataForProfileKey: PropTypes.object.isRequired
};

export default ProfileArgumentChart;