import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WorkshopCode.css';
import TappableButton from './components/TappableButton.js';
import Bounceable from './components/Bounceable.js';
import Delay from './components/Delay.js';


// Asks user to enter a workshop code.
class WorkshopCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopCode: ''
    };
    this.onDelayDone = this.onDelayDone.bind(this);
    this.onDelaySettled = this.onDelaySettled.bind(this);
    this.onChangeWorkshopCode = this.onChangeWorkshopCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onStart = this.onStart.bind(this);
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

  onChangeWorkshopCode(event) {
    const workshopCode = event.target.value;
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
    const {workshopCode} = this.state;
    const height = 160;

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
                <div className="WorkshopCode-instructions">Please enter your workshop code:</div>
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
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default WorkshopCode;