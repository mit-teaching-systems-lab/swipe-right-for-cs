import React, { Component } from 'react';
import PropTypes from 'prop-types';
import __groupBy from 'lodash/groupBy';
import __orderBy from 'lodash/orderBy';
import StudentProfile from './StudentProfile.js';
import Bubble from './components/Bubble.js';
import Swipeable from './components/Swipeable.js';
import {Interactions} from './shared/data.js';
import './ReviewPhaseView.css';


function copyFor(copyVersion) {
  // for JLT playest iteration on 3/22
  if (copyVersion === 'jlt1') {
    return (
      <div>
        <p>{"Here are the top three arguments for each student, based on how other folks in the workshop responded."}</p>
        <p>{"Why do you think folks chose different arguments for different students?"}</p>
      </div>
    );
  }

  // Default copy
  return (
    <div>
      <p>{"Here are the top three arguments for each student, based on how other folks in the workshop responded."}</p>
      <p>{"How would you approach recruiting conversations differently with different students?"}</p>
    </div>
  );
}

// Review peer responses within the workshop.
class ReviewPhaseView extends Component {
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
    const {students, reviewPhaseOptions} = this.props;
    const {copyVersion} = reviewPhaseOptions;
    const copyEl = copyFor(copyVersion);
    return (
      <div className="ReviewPhaseView">
        <div className="ReviewPhaseView-content">
          <p className="Global-header-font">Round 3: Review</p>
          {copyEl}
        </div>
        <div className="ReviewPhaseView-students">
          {students.map((student) => {
            const {profileName, profileImageSrc, profileText} = student;
            return (
              <div key={profileName}>
                <div className="ReviewPhaseView-student">
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
        <div className="ReviewPhase-continue" />
        <Swipeable
          height={120}
          onSwipeRight={this.onSwipeRight}>
          <div className="DiscussPhase-swipe">
            <div className="DiscussPhase-swipe-inner">
              {"When you're done, swipe right to move on."}
            </div>
          </div>
        </Swipeable>
      </div>
    );
  }

  renderPeerResponses(student) {
    const {peerResponses, reviewPhaseOptions} = this.props;
    const {showPercents} = reviewPhaseOptions; // added for disabling on JLT playest iteration on 3/22
    const topN = 3;
    const rows = __groupBy(peerResponses, 'profileName')[student.profileName] || [];
    const sortedRows = __orderBy(rows, ['percentageRight'], ['desc']);
    return (
      <div className="ReviewPhaseView-peer-responses">
        {sortedRows.slice(0, topN).map(row =>
          <div key={row.argumentText} className="ReviewPhaseView-argument-container">
            <Bubble>{row.argumentText}</Bubble>
            {showPercents && (
              <div className="ReviewPhaseView-percentage" style={{width: `${row.percentageRight}%`}}>
                <div className="ReviewPhaseView-percentage-text">{row.percentageRight}%</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

ReviewPhaseView.propTypes = {
  workshopCode: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  peerResponses: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  reviewPhaseOptions: PropTypes.shape({
    showPercents: PropTypes.bool.isRequired,
    copyVersion: PropTypes.string.isRequired
  })
};

export default ReviewPhaseView;