import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InteractionTypes} from '../shared/data.js';


// Render a list of logged user interactions
class InteractionsView extends Component {
  render() {  
    // unpack!
    //filter out testing data
    const interactions = this.props.interactions.filter(row =>{  
      if (row.session.workshopCode === 'foo') return false;
      if (row.session.workshopCode === 'demo') return false;
      if (row.session.workshopCode === 'code.org') return false;
      if (row.session.workshopCode.indexOf('DEMO') === 0) return false;
      if (row.session.identifier === 'UNKNOWN_IDENTIFIER') return false;
      if (row.session.identifier === '') return false;
      if (row.session.identifier === 'kevin') return false;
      return true;
    });
    // show it!
    //render data as a filterable table
    return( 
      <div>
        {this.renderPercentSwipeRight(interactions)}
        {this.renderPercentRightPerProfile(interactions)}
        <table>{interactions.map(row =>{
          return <tr key = {row.id}>
            <td> {row.id} </td>
            <td> {row.timestampz} </td>
            <td> {row.interaction.type} </td>   
            <td> {JSON.stringify(row.interaction)} </td>     
          </tr>;
        })}</table>
      </div>
    );
  }
  renderPercentSwipeRight(interactions){
    var sum = 0;
    interactions.forEach(row =>{
      if (row.interaction.type === InteractionTypes.SWIPE_RIGHT){
        sum += 1;
      }
    });
    return sum/interactions.length*100;
  }

  renderPercentRightPerProfile(interactions){
    var totals = {};
    var percents = {};
    interactions.forEach(row =>{
      if (row.interaction.type === InteractionTypes.SWIPE_RIGHT || row.interaction.type === InteractionTypes.SWIPE_LEFT){
        if (row.interaction.turn.profileKey in totals){
          if (row.interaction.type === InteractionTypes.SWIPE_RIGHT) totals[row.interaction.turn.profileKey][0] += 1;
          totals[row.interaction.turn.profileKey][1] += 1;
        }
        else{
          totals[row.interaction.turn.profileKey] = [1,1];
        }
      }
      for (var k in totals){
        percents[k] = totals[k][0]/totals[k][1]*100 ;
      }
    });
    return JSON.stringify(percents);
  }


}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;