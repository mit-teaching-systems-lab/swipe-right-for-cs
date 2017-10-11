import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StudentProfile from './StudentProfile.js';
import './DiscussPhase.css';

// Show the phase where folks talk in pairs about students.
class DiscussPhase extends Component {
  render() {
    const {students} = this.props;
    return (
      <div className="DiscussPhase">
        <div className="DiscussPhase-content">
          <div>
            <p className="Global-header-font">Round 2</p>
            <p>Turn and talk with a partner about the students you encountered.  What assumptions did you make about those students?</p>
            <p>{"When discussing, practice using as 'asset framing' and describing students as competent and capable young people."}</p>
            <p>What could you say to connect interests to each other?</p>
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