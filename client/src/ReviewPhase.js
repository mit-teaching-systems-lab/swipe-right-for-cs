import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReviewPhaseView from './ReviewPhaseView.js';
import {error} from './shared/log.js';

// Review peer responses within the workshop.
class ReviewPhase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peerResponses: null
    };
    this.onDataLoaded = this.onDataLoaded.bind(this);
    this.onDataError = this.onDataError.bind(this);
  }

  componentDidMount() {
    const {workshopCode} = this.props;
    fetch(`/api/peers/${workshopCode}`)
      .then(r => r.json())
      .then(this.onDataLoaded)
      .catch(this.onDataError);
  }

  onDataLoaded(data) {
    this.setState({peerResponses: data.rows});
  }

  onDataError(err) {
    error(err); // eslint-disable-line no-console
  }

  render() {
    const {
      workshopCode,
      students,
      onInteraction,
      onDone,
      reviewPhaseOptions
    } = this.props;
    const {peerResponses} = this.state;
    if (peerResponses === null) return null;
    return (
      <ReviewPhaseView
        workshopCode={workshopCode}
        students={students}
        peerResponses={peerResponses}
        onInteraction={onInteraction}
        onDone={onDone}
        reviewPhaseOptions={reviewPhaseOptions}
      />
    );
  }
}

ReviewPhase.propTypes = {
  workshopCode: PropTypes.string.isRequired,
  students: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInteraction: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  reviewPhaseOptions: PropTypes.shape({
    showPercents: PropTypes.bool.isRequired,
    copyVersion: PropTypes.string.isRequired
  })
};

export default ReviewPhase;