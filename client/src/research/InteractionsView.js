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


    // TODO render these as a filterable table
    // 1. Render using a <pre> tag and JSON.stringify(json, null, 2) so see if things look right
    // 2. Change to a table with each interaction as a row using <table><tr><td> etc.
    // 3. Add https://github.com/bvaughn/react-virtualized and use that
    return( 
      <div>
        {this.renderPercentSwipeRight(interactions)}
        <table>{interactions.map(row =>{
          return <tr key = {row.id}>
            <td> {row.id} </td>
            <td> {row.timestampz} </td>
            <td> {row.interaction.type} </td>        
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
}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;