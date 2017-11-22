import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WorkshopsAnalysis from './WorkshopsAnalysis';
import BiasAnalysis from './BiasAnalysis';
import RawInteractionsTable from './RawInteractionsTable';
import './InteractionsView.css';
import {
  onlyConsentedInteractions,
  withoutDemoInteractions
} from './functions';


// Show different analyses of user interactions
class InteractionsView extends Component {
  render() {  
    const rawInteractions = this.props.interactions;
    const codeOrgInteractions = withoutDemoInteractions(rawInteractions);
    const consentedCodeOrgInteractions = onlyConsentedInteractions(codeOrgInteractions);

    return (
      <div className="InteractionsView">
        <h1>What happened in each workshop?</h1>
        <div className="InteractionView-analysis">
          <WorkshopsAnalysis codeOrgInteractions={codeOrgInteractions} />
        </div>
        
        <h1>What evidence do we see of bias?</h1>
        <div className="InteractionView-analysis">
          {consentedCodeOrgInteractions.length > 0
            ? <BiasAnalysis consentedInteractions={consentedCodeOrgInteractions} />
            : 'No swipes!'}
        </div>
        
        <h1>What does the raw data look like?</h1>
        <div className="InteractionView-analysis">
          <div style={{marginBottom: 20, color: 'red'}}>Warning: this includes unconsented data as well.</div>
          <RawInteractionsTable interactions={rawInteractions} />
        </div>
      </div>
    );
  }
}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;