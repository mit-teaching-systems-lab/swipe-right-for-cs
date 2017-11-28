import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile} from './calculations';
import _ from 'lodash';
import {
  isSwipe
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
    const groupedByKey = _.mapValues(groupedByName, row => {
      return percentRightPerProfile(row, 'profileKey');
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
              {_.map(profileKeys, profileKey=>{
                return <td>{row[profileKey]}</td>; 
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