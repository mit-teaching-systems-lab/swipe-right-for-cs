import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WorkshopCode.css';
import codeOrgLogo from './img/codeorg.png';
import TappableButton from './components/TappableButton.js';


// Allows user to change email and asks them to enter workshop code.
class WorkshopCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopCode: '',
      email: props.email
    };
    this.onChangeWorkshopCode = this.onChangeWorkshopCode.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onStart = this.onStart.bind(this);
  }

  componentDidMount() {
    this.emailInputEl.setAttribute('nochilddrag', 'nochilddrag');
    this.workshopInputEl.setAttribute('nochilddrag', 'nochilddrag');
    const {email} = this.state;
    if (email === '') {
      this.emailInputEl.focus();
    } else {
      this.workshopInputEl.focus();
    }
  }

  onChangeWorkshopCode(event) {
    const workshopCode = event.target.value;
    this.setState({workshopCode});
  }

  onChangeEmail(event) {
    const email = event.target.value;
    this.setState({email});
  }

  onStart() {
    const {onDone} = this.props;
    const {workshopCode} = this.state;
    onDone(workshopCode);
  }

  render() {
    const {workshopCode, email} = this.state;
    return (
      <div className="WorkshopCode">
        <img
          className="WorkshopCode-logo"
          src={codeOrgLogo}
          alt="Code.org"
          width={128}
          height={126} />
        <div className="WorkshopCode-form">
          <div className="WorkshopCode-instructions">Code Studio email:</div>
          <input
            ref={(input) => { this.emailInputEl = input; }} 
            className="WorkshopCode-input WorkshopCode-email"
            type="text"
            onChange={this.onChangeEmail}
            value={email} />
          <div className="WorkshopCode-instructions">Workshop code:</div>
          <input
            ref={(input) => { this.workshopInputEl = input; }} 
            className="WorkshopCode-input WorkshopCode-workshop"
            type="text"
            value={workshopCode}
            onChange={this.onChangeWorkshopCode} />
          <TappableButton
            disabled={email === "" || workshopCode === ""}
            onClick={this.onStart}>
            Start
          </TappableButton>
        </div>
      </div>
    );
  }
} 

WorkshopCode.propTypes = {
  email: PropTypes.string.isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default WorkshopCode;