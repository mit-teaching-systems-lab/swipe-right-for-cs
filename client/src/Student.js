import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Turn from './Turn.js';
import StudentProfile from './StudentProfile.js';
import Interactions from './Interactions.js';
import './Student.css';



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
    const {
      profileName,
      profileKey,
      profileText,
      profileImageSrc,
      argumentTexts
    } = this.props;
    const {swipesMade} = this.state;
    return {
      profileKey,
      profileName,
      profileText,
      profileImageSrc,
      argumentText: argumentTexts[swipesMade]
    };
  }

  onDoneTurn() {
    const swipesMade = this.state.swipesMade + 1;
    this.setState({swipesMade});
  }

  onChoiceTapped(choices, choiceText, choiceIndex) {
    const {onDone, onInteraction} = this.props;
    const {
      profileName,
      profileKey,
      profileText,
      profileImageSrc
    } = this.props;
    const interaction = Interactions.studentRating({
      choices,
      choiceIndex,
      choiceText,
      student: {
        profileName,
        profileKey,
        profileText,
        profileImageSrc
      }
    });
    onInteraction(interaction);
    onDone();
  }

  render() {
    const {argumentTexts} = this.props;
    const {swipesMade} = this.state;

    return (
      <div className="Student">
        {(swipesMade < argumentTexts.length)
          ? this.renderTurn()
          : this.renderQuestion()}
      </div>
    );
  }

  renderTurn() {
    const {onInteraction, swipeHeight} = this.props;
    const turn = this.currentTurn();
    return (
      <Turn
        {...turn}
        swipeHeight={swipeHeight}
        onInteraction={onInteraction}
        onDone={this.onDoneTurn} />
    );
  }

  renderQuestion() {
    const {profileImageSrc, profileName, profileText, swipeHeight} = this.props;
    const choices = [
      "they're in",
      "they need one more nudge",
      "i didn't get there yet"
    ];

    return (
      <div className="Student-rating">
        <StudentProfile
          className="Student-profile"
          profileImageSrc={profileImageSrc}
          profileName={profileName}
          profileText={profileText} />
        <div className="Student-choices-container" style={{height: swipeHeight}}>
          <div>How likely are they to take CS?</div>
          <ul className="Student-choices">
            {choices.map((choice, choiceIndex) => {
              return (
                <li
                  key={choice}
                  onClick={this.onChoiceTapped.bind(this, choices, choice, choiceIndex)}>
                  {choice}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

Student.propTypes = {
  profileName: PropTypes.string.isRequired,
  profileKey: PropTypes.string.isRequired,
  profileImageSrc: PropTypes.string.isRequired,
  profileText: PropTypes.string.isRequired,
  argumentTexts: PropTypes.arrayOf(PropTypes.string).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  swipeHeight: PropTypes.number
};
Student.defaultProps = {
  swipeHeight: 140
};

export default Student;