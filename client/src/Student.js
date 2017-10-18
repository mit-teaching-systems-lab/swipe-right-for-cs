import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bounceable from './components/Bounceable.js';
import Bubble from './components/Bubble.js';
import Delay from './components/Delay.js';
import Swipeable from './components/Swipeable.js';
import TappableButton from './components/TappableButton.js';
import StudentProfile from './StudentProfile.js';
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
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
    this.onChoiceTapped = this.onChoiceTapped.bind(this);
  }

  currentSwipeTurn() {
    const argumentText = this.currentArgumentText();
    const {profileName, profileKey, profileText, profileImageSrc} = this.props;
    return {
      argumentText,
      profileName,
      profileKey,
      profileText,
      profileImageSrc
    }; 
  }

  currentArgumentText() {
    const {argumentTexts} = this.props;
    const {swipesMade} = this.state;
    return argumentTexts[swipesMade];
  }

  onSwipeLeft(turn) {
    this.onSwipe(Interactions.swipeLeft(turn));
  }

  onSwipeRight(turn) {
    this.onSwipe(Interactions.swipeRight(turn));
  }

  onSwipe(interaction) {
    const {onInteraction} = this.props;
    onInteraction(interaction);
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
    const {profileImageSrc, profileName, profileText} = this.props;
    
    return (
      <div className="Student">
        <div className="Student">
          <StudentProfile
            className="Student-profile"
            profileImageSrc={profileImageSrc}
            profileName={profileName}
            profileText={profileText} />
          {(swipesMade < argumentTexts.length)
            ? this.renderSwipeTurn()
            : this.renderHowLikely()}
        </div>
      </div>
    );
  }

  renderSwipeTurn() {
    const {swipeHeight} = this.props;
    const turn = this.currentSwipeTurn();
    const {argumentText} = turn;
    return (
      <div style={{height: swipeHeight}}>
        <Delay wait={500}>
          <Swipeable
            key={argumentText}
            height={swipeHeight}
            onSwipeLeft={this.onSwipeLeft.bind(this, turn)}
            onSwipeRight={this.onSwipeRight.bind(this, turn)}>
            <div className="Student-argument">
              <Bubble>“{argumentText}”</Bubble>
            </div>
          </Swipeable>
        </Delay>
      </div>
    );
  }

  renderHowLikely() {
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
                  outerStyle={styles.buttonOuter}
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
  buttonOuter: {
    flex: 1
  },
  button: {
    height: '3.8em',
    padding: 3,
    fontSize: 13,
    margin: 10,
  }
};

export default Student;