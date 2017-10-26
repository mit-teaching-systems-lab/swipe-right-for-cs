import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WorkshopCode.css';
import codeOrgLogo from './img/code.png';
import TappableButton from './components/TappableButton.js';
import Bounceable from './components/Bounceable.js';
import Delay from './components/Delay.js';


// Asks user to enter a workshop code.
class WorkshopCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopCode: '',
      isWarningDismissed: false
    };
    this.onDelayDone = this.onDelayDone.bind(this);
    this.onDelaySettled = this.onDelaySettled.bind(this);
    this.onChangeWorkshopCode = this.onChangeWorkshopCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onDismissWarningClicked = this.onDismissWarningClicked.bind(this);
    this.onCodeTapped = this.onCodeTapped.bind(this);
  }

  isReadyToSubmit() {
    const {workshopCode} = this.state;
    return (workshopCode !== "");
  }
  
  onDelayDone() {
    this.workshopInputEl.setAttribute('nochilddrag', 'nochilddrag');
    window.setTimeout(this.onDelaySettled, 100);
  }

  // Since there's some jank setting the focus while animating.
  onDelaySettled() {
    this.workshopInputEl.focus();
  }

  onCodeTapped() {
    window.location = 'https://studio.code.org/levels/10398';
  }

  onDismissWarningClicked() {
    this.setState({ isWarningDismissed: true });
  }


  onChangeWorkshopCode(event) {
    const workshopCode = event.target.value.toUpperCase(); // case matters
    this.setState({workshopCode});
  }

  // For the enter keypress
  onSubmit(event) {
    event.preventDefault();
    if (this.isReadyToSubmit()) {
      this.onStart();
    }
  }

  onStart() {
    const {onDone} = this.props;
    const {workshopCode} = this.state;
    onDone(workshopCode);
  }

  render() {
    const {shouldWarnAboutCodeStudio} = this.props;
    const {isWarningDismissed} = this.state;

    return (
      <div className="WorkshopCode">
        <p className="WorkshopCode-intro">Swipe Right for CS!</p>
        {shouldWarnAboutCodeStudio && !isWarningDismissed
          ? this.renderWarning()
          : this.renderForm()}
      </div>
    );
  }

  renderForm() {
    const {workshopCode} = this.state;
    const height = 200;

    return (
      <Delay key="form" wait={250} onDone={this.onDelayDone}>
        <Bounceable height={height}>
          <form className="WorkshopCode-form" onSubmit={this.onSubmit}>
            <button type="submit" style={{display: 'none'}} />
            <div className="WorkshopCode-instructions">Please enter the code you used when taking attendance at the start of the workshop.</div>
            <input
              ref={(input) => { this.workshopInputEl = input; }} 
              className="WorkshopCode-input WorkshopCode-workshop"
              type="text"
              placeholder="WXYZ"
              value={workshopCode}
              onChange={this.onChangeWorkshopCode} />
            <TappableButton
              disabled={!this.isReadyToSubmit()}
              onClick={this.onStart}
              outerStyle={styles.outerButton}>
              Continue
            </TappableButton>
          </form>
        </Bounceable>
      </Delay>
    );
  }

  renderWarning() {
    const height = 240;
    return (
      <Delay key="warning" wait={500}>
        <Bounceable height={height}>
          <div className="WorkshopCode-warning">
            <TappableButton style={styles.codeButton} onClick={this.onCodeTapped}>
              <div className="WorkshopCode-row">
                <div className="WorkshopCode-warning-message">Please tap to read the Code Studio page first!</div>
                <img
                  className="WorkshopCode-logo"
                  src={codeOrgLogo}
                  alt="Code.org"
                  width={86}
                  height={85} />
              </div>
            </TappableButton>
            <div className="WorkshopCode-row">
              <TappableButton
                onClick={this.onDismissWarningClicked}
                outerStyle={styles.outerButton}
                style={styles.subtleButton}>
                {"I can't"}
              </TappableButton>
            </div>
          </div>
        </Bounceable>
      </Delay>
    );
  }
} 

WorkshopCode.propTypes = {
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  shouldWarnAboutCodeStudio: PropTypes.bool
};
WorkshopCode.defaultProps = {
  shouldWarnAboutCodeStudio: false
};

const styles = {
  outerButton: {
    width: '50%',
    marginTop: 10
  },
  subtleButton: {
    backgroundColor: '#eee',
    color: 'black'
  },
  codeButton: {
    backgroundColor: '#149EAD'
  }
};

export default WorkshopCode;