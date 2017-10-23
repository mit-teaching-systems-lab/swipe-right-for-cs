import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Interactions} from './shared/data.js';
import {consentText} from './shared/consent.js';
import TappableButton from './components/TappableButton.js';
import './ConsentPhase.css';


// Ask the user for research consent.
// Note that changes here may require IRB amendments.
class ConsentPhase extends Component {
  constructor(props) {
    super(props);
    this.onConsent = this.onConsent.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  onConsent() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.gaveConsent());
    onDone();
  }

  onDecline() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.declinedConsent());
    onDone();
  }

  render() {
    return (
      <div className="ConsentPhase">
        <div className="ConsentPhase-content">
          <div className="Global-header-font">Research consent</div>
          <div className="ConsentPhase-text">{consentText}</div>
          <div className="ConsentPhase-choices">
            <TappableButton onClick={this.onDecline}>No thanks</TappableButton>
            <TappableButton onClick={this.onConsent}>I consent</TappableButton>
          </div>
        </div>
      </div>
    );
  }
}
ConsentPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default ConsentPhase;
