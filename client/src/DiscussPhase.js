import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentProfile from './StudentProfile.js';
import Swipeable from './components/Swipeable.js';
import Interactions from './Interactions.js';
import './DiscussPhase.css';

const copyText = `Turn and talk with a partner about the students you encountered.

How could you connect these capable young people's strengths and interests to computer science?`;


// Show the phase where folks talk in pairs about students.
class DiscussPhase extends Component {
  constructor(props) {
    super(props);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  onSwipeRight() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.doneDiscussPhase());
    onDone();
  }

  render() {
    const {students} = this.props;
    return (
      <div className="DiscussPhase">
        <div className="DiscussPhase-content">
          <div>
            <p className="Global-header-font">Round 2: Discuss</p>
            <p className="Discuss-copy">{copyText}</p>
          </div>
          <div className="DiscussPhase-students">
            {students.map((student) => {
              const {profileName, profileImageSrc, profileText} = student;
              return (
                <div key={profileName} className="DiscussPhase-student">
                  <StudentProfile
                    profileName={profileName}
                    profileImageSrc={profileImageSrc}
                    profileText={profileText} />
                </div>
              );
            })}
          </div>
        </div>
        <Swipeable
          height={120}
          onSwipeRight={this.onSwipeRight}>
          <div className="DiscussPhase-swipe">Swipe to continue!</div>
        </Swipeable>
      </div>
    );
  }
}

DiscussPhase.propTypes = {
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default DiscussPhase;