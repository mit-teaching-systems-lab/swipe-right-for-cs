import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Delay from 'react-delay';
import './Title.css';
import logoSrc from './img/swipe.png';
import Swipeable from './components/Swipeable.js';

class Title extends Component {
  constructor(props) {
    super(props);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  onSwipeRight() {
    const {onDone} = this.props;
    onDone();
  }

  render() {
    return (
      <div className="Title">
        <p className="Title-intro">
          Swipe Right for CS!    
        </p>
        <Delay wait={750}>
          <Swipeable
            height={128}
            onSwipeRight={this.onSwipeRight}>
            <div className="Title-swipe">
              <img
                className="Title-logo"
                alt="Logo"
                src={logoSrc}
                height={128}
                width={128} />
              <div>Swipe right to play!</div>
            </div>
          </Swipeable>
        </Delay>
      </div>
    );
  }
} 

Title.propTypes = {
  onDone: PropTypes.func.isRequired
};

export default Title;