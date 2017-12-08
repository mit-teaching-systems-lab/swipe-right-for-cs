import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile, totalSwipes} from './calculations';
import _ from 'lodash';
import {
  isSwipe
} from './functions.js';
import './BubbleChart.css';


//This component creates a Bubble Chart graph which has student on the vertical axis and possible profiles for any student on the horizontal axis
//circles on the chart represent the percentage of people who swiped right for a given student and profile
class BubbleChart extends Component{

  makeBubble(percentage){
    const colors = ['#a50026','#ab0726','#b00f26','#b51527','#bb1a27','#c11f27','#c62427','#cc2827','#d22c27','#d73027',
      '#d73027','#da382a','#dd402d','#e14730','#e44e33','#e75436','#eb5b39','#ee613c','#f1673f','#f46d43',
      '#f46d43','#f57546','#f77c49','#f8844d','#f98b50','#fa9253','#fb9a57','#fca05a','#fca75e','#fdae61',
      '#fee08b','#fbe28b','#f8e28b','#efe78b','#eee78b','#ede88b','#e3eb8b','#e3ec8b','#daee8b','#d9ef8b',
      '#d9ef8b','#d3ed87','#cfea84','#c8e780','#c3e57d','#bce378','#b7e175','#b1de71','#acdc6e','#a6d96a',
      '#a6d96a','#9ed669','#98d368','#91cf68','#8bcd67','#84ca66','#7dc665','#76c365','#6fc064','#66bd63',
      '#66bd63','#5fb961','#58b45f','#51b05d','#4aac5a','#42a958','#3aa556','#32a154','#289c52','#1a9850',
      '#1a9850','#18934e','#158e4b','#138a48','#108546','#0d7f43','#0a7b41','#07763f','#05723c','#026c39','#006837'];
    var color =  colors[Math.floor(percentage)];
    // console.log(percentage)
    var styles = {
      backgroundColor:color,
      height:percentage,
      width:percentage,
      borderRadius: 100, 
    };
    var reactNode = <div style={styles}></div>;
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
              <td><img src={pics[profileName]} alt="" height="100" width="100"/></td>
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