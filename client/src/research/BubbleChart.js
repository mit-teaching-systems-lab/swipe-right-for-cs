import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile} from './calculations';
import _ from 'lodash';
import {
  isSwipe
} from './functions.js';
import './BubbleChart.css';


//This component creates a Bubble Chart graph which has student on the vertical axis and possible profiles for any student on the horizontal axis
//circles on the chart represent the percentage of people who swiped right for a given student and profile
class BubbleChart extends Component{

  makeBubble(percentage){
    const colors = ['black', 'yellow', 'orange', 'green', 'tomato', 'purple', 'Aqua','blue','violet','red'];
    var color =  colors[Math.floor(percentage/10)];
    if (color === undefined) {
      color = 'black';
      percentage = 10;
    }
    var styles = {
      backgroundColor:'black',
      height:percentage,
      width:percentage,
      borderRadius: 100, 
    };
    var reactNode = <div style={styles}></div>;
    return reactNode;
  }

  render() {
    const interactions = this.props.consentedInteractions.filter(isSwipe);
    const profileKeys = _.uniq(_.map(interactions, row=>{
      return row.interaction.turn.profileKey;
    }));
    const groupedByName = _.groupBy(interactions, row => {
      return row.interaction.turn['profileName'];
    });
    const groupedByKey = _.mapValues(groupedByName, row => {
      return percentRightPerProfile(row, 'profileKey');
    }); 
    
    const pics = _.mapKeys(interactions, row => {
      return row.interaction.turn['profileImageSrc']; 
    }); 
    return (
      <table className = "Bubble-table">

        <tr className = "Bubble-row">
          <td className="Bubble-data">Name</td>
          {_.map(profileKeys, profileKey=>{
            return <td className="Bubble-data">{profileKey}</td>;
          })}
        </tr>
        {_.map(groupedByKey, (row, profileName) => {
          return (
            <tr className="Bubble-row">
              <td className="Bubble-data"><img src={pics[profileName]} alt="" height="100" width="100"/></td>
              {_.map(profileKeys, profileKey=>{
                return <td className="Bubble-data">{this.makeBubble(row[profileKey])}</td>; 
              })}
            </tr>
          );
        })}
      </table> );
  } 
}

BubbleChart.propTypes = {
  consentedInteractions: PropTypes.array.isRequired
};

export default BubbleChart;