import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DownloadCsvLinks from '../components/DownloadCsvLinks';
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
          {this.renderDownloadCsvButton(rawInteractions)}
        </div>
      </div>
    );
  }

  renderDownloadCsvButton(rawInteractions) {
    const dateText = 'foo';
    const filename = `swipe-right-${dateText}.tsv`;
    const headers = ['ID', 'SESSION', 'INTERACTION', 'TIMESTAMPZ'];
    return (
      <DownloadCsvLinks
        filename={filename}
        headers={headers}
        rows={rawInteractions}
        toLine={row => {
          return [row.id, JSON.stringify(row.session), JSON.stringify(row.interaction), row.timestampz];
        }} />
    );
  }
}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;