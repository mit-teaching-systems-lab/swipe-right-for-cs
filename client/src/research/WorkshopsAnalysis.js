import React from 'react';
import PropTypes from 'prop-types';
import __uniq from 'lodash/uniq';
import __groupBy from 'lodash/groupBy';
import __toPairs from 'lodash/toPairs';
import __minBy from 'lodash/minBy';
import __maxBy from 'lodash/maxBy';
import __sortBy from 'lodash/sortBy';
import dateFormat from 'dateformat';
import {Table, Column, AutoSizer} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
  consentRateFor,
  onlyConsentedInteractions,
  formatPercent
} from './functions';




// Returns a list of workshops with stats about each
function summarizeWorkshops(allInteractions) {
  return __toPairs(__groupBy(allInteractions, row => row.session.workshopCode)).map(pair => {
    // Include unconsented
    const [workshopCode, rawInteractions] = pair;
    const timeStart = __minBy(rawInteractions, 'timestampz').timestampz;
    const timeEnd = __maxBy(rawInteractions, 'timestampz').timestampz;
    const consentRate = consentRateFor(rawInteractions);

    // Only consented
    const interactions = onlyConsentedInteractions(rawInteractions);
    const consentedIdentifiers = __uniq(interactions.map(row => row.session.identifier)).length;
    const allIdentifiers = __uniq(rawInteractions.map(row => row.session.identifier)).length;
    return {
      workshopCode,
      consentedIdentifiers,
      consentRate: formatPercent(consentRate),
      unconsentedIdentifiers: allIdentifiers - consentedIdentifiers,
      timeStart: dateFormat(new Date(timeStart), 'mm/dd/yy   hh:mm:ss'),
      timeEnd: dateFormat(new Date(timeEnd), 'mm/dd/yy   hh:mm:ss')
    };
  });
}


// Shows an analyis of what was done in code.org workshops
class WorkshopsAnalysis extends React.Component {
  render() {
    const {codeOrgInteractions} = this.props;

    return (
      <div className="WorkshopsAnalysis">
        {this.renderSummary(codeOrgInteractions)}
        {this.renderConsentedWorkshops(codeOrgInteractions)}
      </div>
    );
  }

  renderSummary(codeOrgInteractions) {
    const consentedInteractions = onlyConsentedInteractions(codeOrgInteractions);
    const consentRate = consentRateFor(codeOrgInteractions);
    const identifierCount = __uniq(consentedInteractions.map(row => row.session.identifier)).length;
    const workshopCodeCount = __uniq(consentedInteractions.map(row => row.session.workshopCode)).length;

    return (
      <div style={{margin: 10}}>
        <div>Consent rate overall: {formatPercent(consentRate)}</div>
        <div>Workshop codes: {workshopCodeCount}</div>
        <div>code.org identifiers: {identifierCount}</div>
        <div>Interactions: {consentedInteractions.length}</div>
      </div>
    );
  }

  renderConsentedWorkshops(codeOrgInteractions) {
    const workshops = summarizeWorkshops(codeOrgInteractions);
    const sortedWorkshops = __sortBy(workshops, 'timeStart');
    const marginRight = 10;
    return (
      <div style={{marginRight, border: '1px solid #eee', fontSize: 10}}>
        <AutoSizer disableHeight>
          {({width}) => (
            <Table
              headerHeight={30}
              height={400}
              rowCount={sortedWorkshops.length}
              rowGetter={({index}) => sortedWorkshops[index]}
              rowHeight={30}
              width={width - marginRight}
            >
              <Column dataKey="workshopCode" label="workshopCode" width={100} />
              <Column dataKey="consentedIdentifiers" label="consented" width={100} />
              <Column dataKey="consentRate" label="consentRate" width={100} />
              <Column dataKey="unconsentedIdentifiers" label="unconsented" width={100} />
              <Column dataKey="timeStart" label="min(time)" width={200} />
              <Column dataKey="timeEnd" label="max(time)"  width={200} />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }
}
WorkshopsAnalysis.propTypes = {
  codeOrgInteractions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default WorkshopsAnalysis;