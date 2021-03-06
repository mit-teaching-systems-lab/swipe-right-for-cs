import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile, totalSwipes} from './calculations';
import _ from 'lodash';
import {
  isSwipe
} from './functions.js';
import './InteractiveBubbleChart.css';
import chroma from 'chroma-js';

//This component creates a Bubble Chart graph which has student on the vertical axis and possible profiles for any student on the horizontal axis
//circles on the chart represent the percentage of people who swiped right for a given student and profile.
//For the normed bubble chart, the values can be normed to a particular student by clicking on that student's picture.
class InteractiveBubbleChart extends Component{
  constructor(props){
    super(props);
    this.state = {profileName: 'Brad'};
  }
  makeBubble(percentage, n){
    const colors = chroma.scale(['white','#006837']);
    const color =  colors(n/50).brighten(1).hex();
    const styles = {
      backgroundColor:color,
      height:percentage,
      width:percentage,
      borderRadius: 100, 
    };
    return <div style={styles} title={`n=${n}`}></div>;
  } 
  makeNormBubble(percentage, n){
    const color = (percentage>0)? "black": "green";
    const dimensions = Math.abs(percentage)*100/65; //resize bubbles: 65% will take up a full bubble. from Milkman   
    const styles = {
      backgroundColor:color,
      height:dimensions,
      width:dimensions,
      borderRadius: 100, 
    };
    return <div style={styles} title={`n=${n}`}></div>;
  }
  norm(allPercents,name){
    const normedPercents = _.mapValues(allPercents, (percentages, person) =>{
      return _.mapValues(percentages, (profilePercent, profile)=>{
        return profilePercent - allPercents[name][profile];
      });
    });
    return normedPercents; 
  }
  onNameClick(profileName, e){
    this.setState({profileName});
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
    const normed = this.norm(groupedByKey, this.state.profileName);
    return (
      <table className="InteractiveBubbleChart InteractiveBubbleChart-table">
        <thead>
          <tr>
            <th><div className="InteractiveBubbleChart-data"> Student </div></th>
            {_.map(profileKeys, profileKey=>{
              return <th key={profileKey}><div className="InteractiveBubbleChart-data"> {profileKey}</div></th>;
            })}
          </tr>
        </thead>
        <tbody>
          {_.map(normed, (row, profileName) => {
            return (
              <tr key={profileName}>
                <td><div className="InteractiveBubbleChart-picture" onClick={this.onNameClick.bind(this,profileName)}><img src={pics[profileName]} alt="" title={profileName} height="100" width="100"/></div></td>
                {_.map(profileKeys, profileKey=>{
                  return <td key={profileKey}><div className="InteractiveBubbleChart-data">{this.makeNormBubble(row[profileKey], numInteractions[profileName][profileKey])}</div></td>; 
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } 
}

InteractiveBubbleChart.propTypes = {
  consentedInteractions: PropTypes.array.isRequired
};

export default InteractiveBubbleChart;