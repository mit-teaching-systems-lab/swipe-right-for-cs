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
      swipesMade: 0,
      hasMadeRating: false,
      openResponseText: ''
    };
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.onSwipe = this.onSwipe.bind(this);
    this.onChoiceTapped = this.onChoiceTapped.bind(this);
    this.onOpenResponseChanged = this.onOpenResponseChanged.bind(this);
  }

  componentDidUpdate() {
    if (this.openResponseEl) this.openResponseEl.focus();
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

  // Return the same shape for logging
  student() {
    const {
      profileName,
      profileKey,
      profileText,
      profileImageSrc
    } = this.props;

    return {
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
    const {onDone, onInteraction, shouldAskOpenResponse} = this.props;
    const student = this.student();
    const interaction = Interactions.studentRating({
      choices,
      choiceIndex,
      choiceText,
      student
    });
    onInteraction(interaction);

    // Depending on the props passed, this may end the round
    // for the student, or move on to asking an open-response question.
    if (shouldAskOpenResponse) {
      this.setState({hasMadeRating: true});
    } else {
      onDone();
    }
  }

  onOpenResponseChanged(event) {
    const openResponseText = event.target.value;
    this.setState({openResponseText});
  }

  // For the enter keypress
  onOpenResponseKeypress(prompt, event) {
    if (event.which === 13) {
      event.preventDefault();
      this.onOpenResponseDone(prompt);
    }
  }

  onOpenResponseDone(prompt) {
    const {onDone, onInteraction} = this.props;
    const {openResponseText} = this.state;
    const student = this.student();
    const interaction = Interactions.openResponse({
      prompt,
      openResponseText,
      student
    });
    onInteraction(interaction);
    onDone();
  }

  render() {
    const {profileImageSrc, profileName, profileText} = this.props;
    
    return (
      <div className="Student">
        <div className="Student">
          <StudentProfile
            className="Student-profile"
            profileImageSrc={profileImageSrc}
            profileName={profileName}
            profileText={profileText} />
          {this.renderAction()}
        </div>
      </div>
    );
  }

  // Three phases: swiping, rating, open response, with last phase optional.
  renderAction() {
    const {argumentTexts} = this.props;
    const {swipesMade, hasMadeRating} = this.state;
    if (swipesMade < argumentTexts.length) return this.renderSwipeTurn();
    if (!hasMadeRating) return this.renderHowLikely();
    return this.renderOpenResponse();
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
      <Bounceable key="how-likely" height={swipeHeight}>
        <div className="Student-choices-container" style={{height: swipeHeight}}>
          <div>How likely are they to take CS?</div>
          <div className="Student-choices">
            {choices.map((choice, choiceIndex) => {
              return (
                <TappableButton
                  key={choice}
                  style={styles.howLikelyButton}
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

  renderOpenResponse() {
    const {swipeHeight} = this.props;
    const {openResponseText} = this.state;
    const prompt = `What else do you want to know?`;

    return (
      <Bounceable key="open-response" height={swipeHeight}>
        <div
          className="Student-open-response-container"
          style={{height: swipeHeight}}>
          <button type="submit" style={{display: 'none'}} />
          <div className="Student-open-response-prompt">{prompt}</div>
          <textarea
            className="Student-open-response-textarea"
            rows={2}
            ref={el => this.openResponseEl = el}
            value={openResponseText}
            onKeyPress={this.onOpenResponseKeypress.bind(this, prompt)}
            onChange={this.onOpenResponseChanged} />
          <TappableButton
            style={styles.openResponseButton}
            outerStyle={styles.openResponseButtonOuter}
            onClick={this.onOpenResponseDone.bind(this, prompt)}>
            OK
          </TappableButton>
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
  swipeHeight: PropTypes.number,
  shouldAskOpenResponse: PropTypes.bool
};
Student.defaultProps = {
  swipeHeight: 140,
  shouldAskOpenResponse: false
};

const styles = {
  buttonOuter: {
    flex: 1
  },
  howLikelyButton: {
    height: '3.8em',
    padding: 3,
    fontSize: 13,
    margin: 10,
  },
  openResponseButton: {
    height: '0.75em',
    fontSize: 13
  },
  openResponseButtonOuter: {
    width: '93%'
  }
};

export default Student;