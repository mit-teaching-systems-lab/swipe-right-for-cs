import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {percentRightPerProfile} from './calculations';
import _ from 'lodash';


class BubbleChart extends Component{
  grouping(interactions, key){
    var groups = _.groupBy(interactions, row => {
      return row.interaction.turn[key];
    });//lodash group by {Name1:{maker:percent},Name3:{captain:percent}} {maker:{Name1: percent, Name2:percent}}
    return groups;
  }
  render(){
    const interactions = this.props.swipeInteractions;
    var bubbleTable = document.getElementById("Bable: Bubble Table");
    const groupedByName = this.grouping(interactions, 'profileName');
    const groupedByKey = _.mapValues(groupedByName, row => {
      return percentRightPerProfile(row, 'profileKey');
    }); 
    _.forIn(groupedByKey, row=>{
      var currentRow = document.createElement("TR");
      _.forIn(row, col =>{
        console.log(row[col])
        currentRow.insertCell(row[col]);
      });
      console.log(currentRow)
      bubbleTable.insertRow(currentRow);
    });
    return bubbleTable;
  } 
}

BubbleChart.propTypes = {
  swipeInteractions: PropTypes.array.isRequired
};

export default BubbleChart;