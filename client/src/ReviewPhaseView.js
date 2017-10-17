import React, { Component } from 'react';
import PropTypes from 'prop-types';
import __groupBy from 'lodash/groupBy';
import __orderBy from 'lodash/orderBy';
import StudentProfile from './StudentProfile.js';
import Bubble from './components/Bubble.js';
import Swipeable from './components/Swipeable.js';
import {Interactions} from './shared/data.js';
import './ReviewPhase.css';

// Review peer responses within the workshop.
class ReviewPhase extends Component {
  constructor(props) {
    super(props);
    this.onSwipeRight = this.onSwipeRight.bind(this);
  }

  onSwipeRight() {
    const {onInteraction, onDone} = this.props;
    onInteraction(Interactions.doneReviewPhase());
    onDone();
  }

  render() {
    const {students} = this.props;
    return (
      <div className="ReviewPhase">
        <div className="ReviewPhase-content">
          <p className="Global-header-font">Round 3: Review</p>
          <p>{"Here's the top three arguments for each student, based on how other folks in the workshop responded."}</p>
        </div>
        <div className="ReviewPhase-students">
          {students.map((student) => {
            const {profileName, profileImageSrc, profileText} = student;
            return (
              <div key={profileName}>
                <div className="ReviewPhase-student">
                  <StudentProfile
                    profileName={profileName}
                    profileImageSrc={profileImageSrc}
                    profileText={profileText} />
                </div>
                {this.renderPeerResponses(student)}
              </div>
            );
          })}
        </div>
        <div className="DiscussPhase-continue">{"When you're done, swipe right to finish."}</div>
        <Swipeable
          height={120}
          onSwipeRight={this.onSwipeRight}>
          <div className="ReviewPhase-swipe">Swipe to continue!</div>
        </Swipeable>
      </div>
    );
  }

  renderPeerResponses(student) {
    const {peerResponses} = this.props;
    const topN = 3;
    const rows = __groupBy(peerResponses, 'profile_name')[student.profileName] || [];
    const sortedRows = __orderBy(rows, ['percentage_right'], ['desc']);
    return (
      <div key={student.profileName} className="ReviewPhase-peer-responses">
        {sortedRows.slice(0, topN).map(row =>
          <div key={row.argument_text} className="ReviewPhase-argument-container">
            <Bubble>{row.argument_text}</Bubble>
            <div className="ReviewPhase-percentage" style={{width: `${row.percentage_right}%`}}>
              <div className="ReviewPhase-percentage-text">{row.percentage_right}%</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReviewPhase.propTypes = {
  workshopCode: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  peerResponses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default ReviewPhase;