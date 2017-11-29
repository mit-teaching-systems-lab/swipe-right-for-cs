import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  percentRightPerProfile,
  totalSwipes
} from './calculations';
import _ from 'lodash';
import {
  formatPercent,
  isSwipe,
  approximatedCI
} from './functions.js';

class BubbleChart extends Component{
  grouping(interactions, key){
    var groups = _.groupBy(interactions, row => {
      return row.interaction.turn[key];
    });//lodash group by {Name1:{maker:percent},Name3:{captain:percent}} {maker:{Name1: percent, Name2:percent}}
    return groups;
  }

  render() {
    const interactions = this.props.consentedInteractions.filter(isSwipe);
    const profileKeys = _.uniq(_.map(interactions, row=>{
      return row.interaction.turn.profileKey;
    }));
    const groupedByName = this.grouping(interactions, 'profileName');
    const groupedByKey = _.mapValues(groupedByName, interactionsForName => {
      return percentRightPerProfile(interactionsForName, 'profileKey');
    }); 
    const swipeCount = _.mapValues(groupedByName, interactionsForName => {
      return totalSwipes(interactionsForName, 'profileKey');
    }); 

    return (
      <table>

        <tr>
          <td>Name</td>
          {_.map(profileKeys, profileKey=>{
            return <td>{profileKey}</td>;
          })}
        </tr>
        {_.map(groupedByKey, (row, profileName) => {
          return (
            <tr>
              <td>{profileName}</td>
              {_.map(profileKeys, profileKey=> {
                const n = swipeCount[profileName][profileKey] || 0;
                const p = n > 0 ? row[profileKey] / 100 : null;
                const ci = n > 0 ? approximatedCI(p, n, 'p99') : null;
                return <td style={{margin: 10}}>
                  <div>{n > 0 && formatPercent(p)}</div>
                  <div style={{color: '#ccc', marginLeft: 5}}>n={n}</div>
                  <div style={{color: '#ccc', marginLeft: 5}}>ci={n > 0 ? formatPercent(ci) : 'na'}</div>
                </td>; 
                // return <td>{_.isNaN(p) ? '' : `${Math.round(p * 100)}+-${formatPercent(ci)}`}</td>; 
              })}
            </tr>
          );
        })}
      </table>
    );
  } 
}

BubbleChart.propTypes = {
  consentedInteractions: PropTypes.array.isRequired
};

export default BubbleChart;