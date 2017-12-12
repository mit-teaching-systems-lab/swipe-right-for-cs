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
import './WorkshopsAnalysis.css';




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

// Returns a list of cells used in the experiment
function summarizeCells(allInteractions) {
  return __toPairs(__groupBy(allInteractions, row => row.session.cohortNumber)).map(pair => {
    const [cohortNumber, rawInteractions] = pair;
    const consentedInteractions = onlyConsentedInteractions(rawInteractions);
    const consentedIdentifiers = __uniq(consentedInteractions.map(row => row.session.identifier)).length;
    const allIdentifiers = __uniq(rawInteractions.map(row => row.session.identifier)).length;
    const dateTexts = __sortBy(__uniq(rawInteractions.map(row => dateFormat(new Date(row.timestampz), 'mm/dd/yy'))));
    const weekCount = __sortBy(__uniq(rawInteractions.map(row => dateFormat(new Date(row.timestampz), 'W')))).length;
    return {
      cohortNumber,
      consentedIdentifiers,
      consentRate: formatPercent(consentedIdentifiers / allIdentifiers),
      weekCount: weekCount,
      dateTexts: dateTexts.join('  ')
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
        {this.renderCells(codeOrgInteractions)}
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
      <div>
        <div className="WorkshopAnalysis-caption">Workshops</div>
        <div className="WorkshopAnalysis-table" style={{marginRight}}>
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
      </div>
    );
  }

  renderCells(allInteractions) {
    const cells = summarizeCells(allInteractions);
    const sortedCells = __sortBy(cells, 'cohortNumber');
    const marginRight = 10;
    return (
      <div>
        <div className="WorkshopAnalysis-caption">Experimental cells</div>
        <div className="WorkshopAnalysis-table" style={{marginRight}}>
          <AutoSizer disableHeight>
            {({width}) => (
              <Table
                headerHeight={30}
                height={400}
                rowCount={sortedCells.length}
                rowGetter={({index}) => sortedCells[index]}
                rowHeight={30}
                width={width - marginRight}
              >
                <Column dataKey="cohortNumber" label="cohortNumber" width={100} />
                <Column dataKey="consentedIdentifiers" label="consented" width={100} />
                <Column dataKey="consentRate" label="consentRate" width={100} />
                <Column dataKey="weekCount" label="Weeks" width={100} />
                <Column dataKey="dateTexts" label="Dates" width={300} />
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}
WorkshopsAnalysis.propTypes = {
  codeOrgInteractions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default WorkshopsAnalysis;