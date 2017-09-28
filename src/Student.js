import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Turn from './Turn.js';




// Render a student, and handle all interactions for swiping or typing
// or working with that student.
class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      swipesMade: 0
    };
    this.onDoneTurn = this.onDoneTurn.bind(this);
  }

  currentTurn() {
    const {profileName, profileText, profileImageSrc, argumentTexts} = this.props;
    const {swipesMade} = this.state;
    return {
      profileName,
      profileText,
      profileImageSrc,
      argumentText: argumentTexts[swipesMade]
    };
  }

  onDoneTurn() {
    const {argumentTexts, onDone} = this.props;
    const swipesMade = this.state.swipesMade + 1;
    if (swipesMade >= argumentTexts.length) return onDone();
    this.setState({swipesMade});
  }

  render() {
    const {onInteraction} = this.props;
    const turn = this.currentTurn();
    return (
      <div className="Student">
        <Turn
          {...turn}
          onInteraction={onInteraction}
          onDone={this.onDoneTurn}
        />
      </div>
    );
  }
}
Student.propTypes = {
  profileName: PropTypes.string.isRequired,
  profileImageSrc: PropTypes.string.isRequired,
  profileText: PropTypes.string.isRequired,
  argumentTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default Student;