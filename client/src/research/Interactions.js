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
    const opt = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'email': 'kevin@mit.edu',
        'token': 'd66bec94-2f39-4ba2-950b-6ec96f34a9b8'
      },
      method: 'GET'
    };
    return (
      <JsonLoader path="/api/research/interactions" options={opt}>
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