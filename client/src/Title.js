import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Title.css';


class Title extends Component {
  render() {
    return (
      <div className="Title">
        <p className="Title-intro">
          Swipe Right for CS!    
        </p>
        <button
          className="button"
          onClick={this.props.onDone}>CLICK ME TO PLAY</button>
      </div>
    );
  }
} 

Title.propTypes = {
  onDone: PropTypes.func.isRequired
};

export default Title;