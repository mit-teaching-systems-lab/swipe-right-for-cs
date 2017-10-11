import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Delay from 'react-delay';
import Interactions from './Interactions.js';
import Bounceable from './components/Bounceable.js';
import fullConsentFile from './files/fullConsentText.txt';
import './ConsentPhase.css';
// import Swipeable from './Swipeable.js';


// Ask the user for research consent.
// Note that changes here may require IRB amendments.
class ConsentPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      fullConsentText: 'Loading...'
    };
    this.onConsentText = this.onConsentText.bind(this);
    this.onReadMoreTapped = this.onReadMoreTapped.bind(this);
    this.onConsent = this.onConsent.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  componentDidMount() {
    fetch(fullConsentFile)
      .then(r => r.text())
      .then(this.onConsentText);
  }

  onConsentText(fullConsentText) {
    this.setState({fullConsentText});
  }

  onReadMoreTapped() {
    const {onInteraction} = this.props;
    onInteraction(Interactions.readMoreConsent());
    this.setState({ isExpanded: true });
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
    const {isExpanded} = this.state;

    return (
      <div className="ConsentPhase">
        <div className="Global-header-font">Research consent</div>
        <div>
          <p className="ConsentPhase-text">Optionally, {"we'd"} like to use your responses here for a joint research study between MIT and code.org.  We would like to compare the responses across participants.</p>
          <p className="ConsentPhase-text">Your responses would be included in the research, along with data from your code.org profile.  All data you enter is stored securely and protected on a secure server on Google Drive, Amazon Web Services or Heroku.  If you consent, we will email you a copy of this form for your records.</p>
          <p className="ConsentPhase-text">You can continue playing the game either way.  Participation in the research study in voluntary.</p>
          {isExpanded && this.renderExpandedConsent()}
        </div>
        <Delay wait={2000}>
          <Bounceable height={120}>
            <div className="ConsentPhase-choices">
              <div onClick={this.onConsent}>I consent</div>
              <div onClick={this.onDecline}>No thanks</div>
              {!isExpanded && <div onClick={this.onReadMoreTapped}>Read more</div>}
            </div>
          </Bounceable>
        </Delay>
      </div>
    );
  }

  renderExpandedConsent() {
    const {fullConsentText} = this.state;
    return <div className="ConsentPhase-full-consent">{fullConsentText}</div>;
  }
}
ConsentPhase.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default ConsentPhase;
