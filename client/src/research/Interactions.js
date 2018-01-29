import React, { Component } from 'react';
import JsonLoader from '../loaders/JsonLoader.js';
import InteractionsView from './InteractionsView.js';
import PropTypes from 'prop-types';


// Show all interactions, allow filtering, etc.
class Interactions extends Component {
  constructor(props) {
    super(props);
    this.renderInteractions = this.renderInteractions.bind(this);
  }

  render() {
    const {email, token} = this.props;
    const opt = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-swiperight-email': email,
        'x-swiperight-token': token
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

Interactions.propTypes = {
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};

Interactions.defaultProps = {
  email: "",
  token: ""
};

export default Interactions;