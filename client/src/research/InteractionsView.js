import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Render a list of logged user interactions
class InteractionsView extends Component {
  render() {
    // TODO render these as a filterable table
    // 1. Render using a <pre> tag and JSON.stringify(json, null, 2) so see if things look right
    // 2. Change to a table with each interaction as a row using <table><tr><td> etc.
    // 3. Add https://github.com/bvaughn/react-virtualized and use that
    return <div>TODO!</div>;
  }
}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;