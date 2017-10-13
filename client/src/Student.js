import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Turn from './Turn.js';
import Bounceable from './components/Bounceable.js';
import StudentProfile from './StudentProfile.js';
import TappableButton from './components/TappableButton.js';
import {Interactions} from './shared/data.js';
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
    const {profileImageSrc, profileName, profileText} = this.props;
    return (
      <div className="Student">
        <StudentProfile
          className="Student-profile"
          profileImageSrc={profileImageSrc}
          profileName={profileName}
          profileText={profileText} />
        {this.renderChoices()}
      </div>
    );
  }

  renderChoices() {
    const {swipeHeight} = this.props;
    const choices = [
      "They're in",
      "They need one more nudge",
      "I didn't get there yet"
    ];

    return (
      <Bounceable height={swipeHeight}>
        <div className="Student-choices-container" style={{height: swipeHeight}}>
          <div>How likely are they to take CS?</div>
          <div className="Student-choices">
            {choices.map((choice, choiceIndex) => {
              return (
                <TappableButton
                  key={choice}
                  style={styles.button}
                  onClick={this.onChoiceTapped.bind(this, choices, choice, choiceIndex)}>
                  {choice}
                </TappableButton>
              );
            })}
          </div>
        </div>
      </Bounceable>
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

const styles = {
  button: {
    height: '3.8em',
    padding: 3,
    flex: 1,
    fontSize: 13,
    margin: 10,
  }
};

export default Student;