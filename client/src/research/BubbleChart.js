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
  constructor(props){
    super(props);
    this.state = {profileName: 'Brad'};
  }
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
  makeNormBubble(percentage, n){
    var color = (percentage>0)? "green": "black";
    var dimensions = Math.abs(percentage)*100/65; //resize bubbles: 65% will take up a full bubble. from Milkman   
    var styles = {
      backgroundColor:color,
      height:dimensions,
      width:dimensions,
      borderRadius: 100, 
    };
    var reactNode = <div style={styles} title={`n=${n}`}></div>;
    return reactNode;
  }
  norm(allPercents,name){
    const normedPercents = _.mapValues(allPercents, (percentages, person) =>{
      return _.mapValues(percentages, (profilePercent, profile)=>{
        return profilePercent - allPercents[name][profile];
      });
    });
    console.log(allPercents, normedPercents)
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
      <table>
        <tr>
          <th><div className="Bubble-data"> Student </div></th>
          {_.map(profileKeys, profileKey=>{
            return <th><div className="Bubble-data"> {profileKey}</div></th>;
          })}
        </tr>
        {_.map(normed, (row, profileName) => {
          return (
            <tr>
              <td><div className="Bubble-picture" onClick={this.onNameClick.bind(this,profileName)}><img src={pics[profileName]} alt="" title={profileName} height="100" width="100"/></div></td>
              {_.map(profileKeys, profileKey=>{
                return <td> <div className="Bubble-data">{this.makeNormBubble(row[profileKey], numInteractions[profileName][profileKey])}</div></td>; 
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