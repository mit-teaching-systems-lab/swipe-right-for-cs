import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentProfile from './StudentProfile.js';
import {Interactions} from './shared/data.js';

// Review peer responses within the workshop.
class ReviewPhase extends Component {
  // constructor(props) {
  //   super(props);
  // }

  onSwipeRight() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.ReviewPhase());
    onDone();
  }

  render() {
    const {students} = this.props;
    return (
      <div className="ReviewPhase">
        <div>Round 3: Review</div>
        <div>{"Here's how other folks in the workshop responded."}</div>
        <div>Scroll down to see more, swipe to see other students, and tap to finish.</div>
        <div className="ReviewPhase-students">
          {students.map((student) => {
            const {profileName, profileImageSrc, profileText} = student;
            return (
              <div key={profileName} className="ReviewPhase-student">
                <StudentProfile
                  profileName={profileName}
                  profileImageSrc={profileImageSrc}
                  profileText={profileText} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

ReviewPhase.propTypes = {
  workshopCode: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default ReviewPhase;