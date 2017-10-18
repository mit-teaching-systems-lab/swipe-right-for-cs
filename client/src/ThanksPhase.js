import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TappableButton from './components/TappableButton.js';
import './ThanksPhase.css';
import {Interactions, InteractionTypes} from './shared/data.js';


// Thanks, come again!
class ThanksPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.onClickedEmail = this.onClickedEmail.bind(this);
    this.onClickedForums = this.onClickedForums.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.doScrollHack();
    this.emailInputEl.setAttribute('nochilddrag', 'nochilddrag');
    this.emailInputEl.focus();
  }
  
  // TODO(kr) hack, not sure why this is necessary, but 
  // this is a problem on desktop Firefox
  doScrollHack() {
    const el = document.querySelector('.MobileSimulator-background');
    if (el) el.scrollTo(0, 0);    
  }
  
  computeMoves() {
    const {logs} = this.props;
    const swipeLogs = logs.filter(log => {
      const isSwipe = ([
        InteractionTypes.SWIPE_RIGHT,
        InteractionTypes.SWIPE_LEFT
      ].indexOf(log.interaction.type) !== -1);
      return isSwipe;
    });
    return swipeLogs.map(log => {
      const {turn, type} = log.interaction;
      const {profileImageSrc, profileText, argumentText} = turn;
      const swipeText = (InteractionTypes.SWIPE_RIGHT === type)
        ? 'You swiped right'
        : 'You swiped left';
      return {
        profileText,
        profileImageSrc,
        argumentText,
        swipeText
      };
    });
  }

  isSendEmailEnabled() {
    const {email} = this.state;
    return (email !== '');
  }

  onChangeEmail(event) {
    this.setState({ email: event.target.value });
  }

  onSubmit(event) {
    if (this.isSendEmailEnabled()) this.onClickedEmail();
    event.preventDefault();
  }

  onClickedEmail() {
    const {onInteraction} = this.props;
    const {email} = this.state;
    const moves = this.computeMoves();
    onInteraction(Interactions.share({moves, email}));
    fetch('/api/share', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({moves, email})
    });
  }

  onClickedForums() {
    const {onInteraction} = this.props;
    onInteraction(Interactions.forums());
    window.open('https://forum.code.org/c/recruitment/recruiting');
  }

  render() {
    const {email} = this.state;
    return (
      <div className="ThanksPhase">
        <div className="ThanksPhase-content">
          <p className="Global-header-font">Thanks!</p>
          <div>We can email you your responses if you like.</div>
          <form className="ThanksPhase-email-container" onSubmit={this.onSubmit}>
            <input
              className="ThanksPhase-email"
              ref={(input) => { this.emailInputEl = input; }} 
              type="text"
              value={email}
              onChange={this.onChangeEmail} />
            <button type="submit" style={{display: 'none'}} />
          </form>
          <TappableButton disabled={!this.isSendEmailEnabled()} outerStyle={{margin: 20, marginTop: 0}} onClick={this.onClickedEmail}>
            Send me an email
          </TappableButton>
          <div>And you can talk more on the Code.org forums too!</div>
          <TappableButton  outerStyle={{margin: 20}} onClick={this.onClickedForums}>
            forums.code.org
          </TappableButton>
          <div className="ThanksPhase-links">{"If you're curious, here's some of the research that informed this work:"}</div>
          <ul className="ThanksPhase-list">
            <li>
              <a href="http://blogs.hmc.edu/lewis/" rel="noopener noreferrer" target="_blank">
                Lewis, C. M.
              </a> (2017). Good (and bad) reasons to teach all students computer science. In S. B. Fee, A. M. Holland-Minkley, & T. E. Lombardi, New Directions for Computing Education: Embedding Computing Across Disciplines. New York: Springer.
            </li>
            <li><a href="https://www.ncwit.org/sites/default/files/resources/c4c_counselorlessonplan_web.pdf" rel="noopener noreferrer" target="_blank">
              NCWIT: Introduce Students to Computer Science in an Engaging Way
            </a></li>
          </ul>
        </div>
      </div>
    );
  }
}

ThanksPhase.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired
};

export default ThanksPhase;