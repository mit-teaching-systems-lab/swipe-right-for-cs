import React, { Component } from 'react';
import JsonLoader from '../loaders/JsonLoader.js';
import InteractionsView from './InteractionsView.js';


// Show all interactions, allow filtering, etc.
class Interactions extends Component {
  constructor(props) {
    super(props);
    this.renderInteractions = this.renderInteractions.bind(this);
  }

  render() {
    return (
      <JsonLoader path="/api/research/interactions">
        {this.renderInteractions}
      </JsonLoader>
    );
  }

  renderInteractions(json) {
    const interactions = json;
    return <InteractionsView interactions={interactions} />;
  }
}

export default Interactions;