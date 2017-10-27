import React, { Component } from 'react';
import PropTypes from 'prop-types';
import db from '../../../tmp/swipe-right-db.json';


// Render a list of logged user interactions
class InteractionsView extends Component {
  render() {  
    // unpack!
    const {interactions} = db;
    // show it!


    // TODO render these as a filterable table
    // 1. Render using a <pre> tag and JSON.stringify(json, null, 2) so see if things look right
    // 2. Change to a table with each interaction as a row using <table><tr><td> etc.
    // 3. Add https://github.com/bvaughn/react-virtualized and use that
    return <div> {interactions.length} </div>;
  }
}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;