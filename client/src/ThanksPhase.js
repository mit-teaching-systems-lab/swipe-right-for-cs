import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Thanks, come again!
class ThanksPhase extends Component {
  render() {
    return (
      <div className="ThanksPhase">
        <div>Thanks!</div>
      </div>
    );
  }
}

ThanksPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired
};

export default ThanksPhase;