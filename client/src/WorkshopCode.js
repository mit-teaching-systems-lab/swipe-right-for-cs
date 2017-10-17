import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WorkshopCode.css';
import TappableButton from './components/TappableButton.js';
import Bounceable from './components/Bounceable.js';
import Delay from './components/Delay.js';


// Allows user to change email and asks them to enter workshop code.
class WorkshopCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopCode: '',
      email: props.email
    };
    this.onDelayDone = this.onDelayDone.bind(this);
    this.onChangeWorkshopCode = this.onChangeWorkshopCode.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStart = this.onStart.bind(this);
  }

  isReadyToSubmit() {
    const {workshopCode, email} = this.state;
    return (email !== "" && workshopCode !== "");
  }
  
  onDelayDone() {
    this.emailInputEl.setAttribute('nochilddrag', 'nochilddrag');
    this.workshopInputEl.setAttribute('nochilddrag', 'nochilddrag');
    window.setTimeout(() => {
      const {email} = this.state;
      if (email === '') {
        this.emailInputEl.focus();
      } else {
        this.workshopInputEl.focus();
      }
    }, 100);
  }

  onChangeWorkshopCode(event) {
    const workshopCode = event.target.value;
    this.setState({workshopCode});
  }

  onChangeEmail(event) {
    const email = event.target.value;
    this.setState({email});
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
    const {workshopCode, email} = this.state;
    const height = 230;

    return (
      <div className="WorkshopCode">
        <p className="WorkshopCode-intro">
          Swipe Right for CS!    
        </p>
        <Delay wait={500} onDone={this.onDelayDone}>
          <Bounceable height={height}>
            <div height={height}>
              <form className="WorkshopCode-form" onSubmit={this.onSubmit}>
                <button type="submit" style={{display: 'none'}} />
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
                  disabled={!this.isReadyToSubmit()}
                  onClick={this.onStart}
                  outerStyle={{width: '50%', marginTop: 10}}>
                  Continue
                </TappableButton>
              </form>
            </div>
          </Bounceable>
        </Delay>
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