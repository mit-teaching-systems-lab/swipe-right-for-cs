import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile, totalSwipes} from './calculations';
import _ from 'lodash';
import {
  isSwipe
} from './functions.js';
import './BubbleChart.css';
import chroma from 'chroma-js';


//This component creates a Bubble Chart graph which has student on the vertical axis and possible profiles for any student on the horizontal axis
//circles on the chart represent the percentage of people who swiped right for a given student and profile
class BubbleChart extends Component{

  makeBubble(percentage, n){
    const colors = chroma.scale(['white','#006837']);
    var color =  colors(n/50).brighten(1).hex();
    var styles = {
      backgroundColor:color,
      height:percentage,
      width:percentage,
      borderRadius: 100, 
    };
    var reactNode = <div style={styles} title={`n=${n}`}></div>;
    return reactNode;
  }
  norm(){

  }
  render() {
    const interactions = this.props.consentedInteractions.filter(isSwipe);
    const profileKeys = _.uniq(_.map(interactions, row=>{
      return row.interaction.turn.profileKey;
    }));
    const groupedByName = _.groupBy(interactions, row => {
      return row.interaction.turn['profileName'];
    });
    const numInteractions = _.mapValues(groupedByName, row=>{
      return totalSwipes(row,'profileKey');
    });
    const groupedByKey = _.mapValues(groupedByName, row => {
      return percentRightPerProfile(row, 'profileKey');
    }); 
    const pics = _.mapValues(groupedByName, (interactions,names) => {
      return interactions[0].interaction.turn['profileImageSrc']; 
    }); 
    return (

      <table className = "Bubble-table">
        <tr className = "Bubble-row">
          <td className="Bubble-data">Student</td>
          {_.map(profileKeys, profileKey=>{
            return <td className="Bubble-data">{profileKey}</td>;
          })}
        </tr>
        {_.map(groupedByKey, (row, profileName) => {
          return (
            <tr className="Bubble-row">
              <td><img src={pics[profileName]} alt="" height="50" width="100"/></td>
              {_.map(profileKeys, profileKey=>{
                return <td className="Bubble-data">{this.makeBubble(row[profileKey], numInteractions[profileName][profileKey])}</td>; 
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