import React from 'react';
import PropTypes from 'prop-types';
import __countBy from 'lodash/countBy';
import __find from 'lodash/find';
import __uniq from 'lodash/uniq';
import __groupBy from 'lodash/groupBy';
import __sortBy from 'lodash/sortBy';
import __mapValues from 'lodash/mapValues';
import __memoize from 'lodash/memoize';
import CountChart from './CountChart';
import PercentageChart from './PercentageChart';
import RatingsChart from './RatingsChart';
import BubbleChart from './BubbleChart';
import ProfileArgumentChart from './ProfileArgumentChart';
import {Choices} from '../shared/data.js';
import {
  isRightSwipe,
  isRating,
  profileNameFromSwipe,
  profileNameFromRating,
  profileKeyFromSwipe,
  profileKeyFromRating,
  simulatedSwipe,
  simulatedRating
} from './functions.js';
import {isSwipe} from './functions';
import './BiasAnalysis.css';


/*
Model paper:
https://www.apa.org/pubs/journals/releases/apl-0000022.pdf

Questions:
We can't oversample sub-groups of teachers based on their demographics, but do we need to look at this later?

Notes:
Binomial distributions don't work across anything, since we can't assume the same underlying
rate -  individual teachers or profiles or names will have different underlying rates.
We did not stratify or balance the conditions across geography, program, etc.  This wouldn't have
worked perfectly given the need for teachers in workshops to be able to communicate, and we didn't
have enough data ahead of time with details about the workshops that were happening to do this.


*/

// This computes data for slicing by an attribute like profileKey or profileName.
// It's computed here so that sorting can be shared across views.
// It also supports simulating each data.
//
// The shape is:
// [{groupKey, swipeCount, swipeRightPercent, ratings: [{0: percentage, 1: percentage, 2: percentage}]}]
function createChartData(allInteractions, groupFns, sorter, options = {}) {
  const {swipeGroupFn, ratingGroupFn} = groupFns;

  // exposure and swipe percentage data
  const swipeInteractions = allInteractions.filter(isSwipe);
  const groupedSwipeInteractions = __groupBy(swipeInteractions, swipeGroupFn);
  const swipeDataByKey = __mapValues(groupedSwipeInteractions, swipeInteractions => {
    const swipeCount = swipeInteractions.length;
    const swipeRightCount = swipeInteractions.filter(isRightSwipe).length;
    const swipeRightPercent = swipeRightCount / swipeCount;
    return {
      swipeCount,
      swipeRightPercent
    };
  });

  // ratings data
  const ratingsDataByKey = computeRatingsMap(allInteractions, ratingGroupFn, options);

  // splice together into a single list
  const groupKeys = __uniq(Object.keys(ratingsDataByKey).concat(Object.keys(swipeDataByKey)));
  const rawDataPoints = groupKeys.map(groupKey => {
    const swipeData = swipeDataByKey[groupKey];
    const {swipeCount, swipeRightPercent} = swipeData;
    const ratings = ratingsDataByKey[groupKey];
    return {
      groupKey,
      swipeCount,
      swipeRightPercent,
      ratings
    };
  });

  // sort
  const dataPoints = __sortBy(rawDataPoints, sorter);
  const labels = dataPoints.map(d => d.groupKey);
  return {labels, dataPoints};
}


// Returns {groupKey: [{ratingValue, percentage}]
function computeRatingsMap(allInteractions, groupFn, options = {}) {
  const ratingInteractions = allInteractions.filter(isRating);
  return __mapValues(__groupBy(ratingInteractions, groupFn), interactions => {
    const totalRatingsCount = interactions.length;
    const ratingCountMap = __countBy(interactions, row => row.interaction.choiceIndex);
    return Object.keys(ratingCountMap).map(ratingValue => {
      const ratingCount = ratingCountMap[ratingValue];
      const percentage = ratingCount / totalRatingsCount;
      return {
        ratingValue: parseInt(ratingValue, 10),
        percentage
      };
    });
  });
}


const defaultSortStrategies = [
  { key: 'swipe-percentage', fn: d => d.swipeRightPercent },
  { key: 'exposure', fn: d => d.swipeCount },
  { key: 'likelihood-in', fn: d => __find(d.ratings, { ratingValue: 0}).percentage }
];


function simulatedInteractionsForSeed(simulateSeed, interactions) {
  if (simulateSeed === null) return interactions;
  return interactions.map(row => {
    if (isSwipe(row)) return simulatedSwipe(row);
    if (isRating(row)) return simulatedRating(row);
    return row;
  });
}

// Shows the analysis about bias related to gender, race, ethnicity
// for swiping and for expectations about taking CS.
class BiasAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simulateSeed: Math.random(),
      sortStrategies: defaultSortStrategies,
      sortStrategyKey: defaultSortStrategies[0].key
    };
    this.onSortClicked = this.onSortClicked.bind(this);
    this.onSimulateClicked = this.onSimulateClicked.bind(this);
    this.onRealDataClicked = this.onRealDataClicked.bind(this);
    this.simulatedInteractionsForSeed = __memoize(simulatedInteractionsForSeed); // memoizing keeps randomization consistent
  }

  currentSorter() {
    const {sortStrategies, sortStrategyKey} = this.state;
    const sortStrategy = __find(sortStrategies, { key: sortStrategyKey });
    return sortStrategy ? sortStrategy.fn : ((d, i) => i);
  }

  // Allows simulating interactions as a way to feel "noise" in the data
  interactions() {
    const {consentedInteractions} = this.props;
    const {simulateSeed} = this.state;
    return this.simulatedInteractionsForSeed(simulateSeed, consentedInteractions); // memoized for seed only
  }

  onSortClicked(sortStrategyKey, e) {
    this.setState({sortStrategyKey});
    e.preventDefault();
  }

  onSimulateClicked() {
    this.setState({ simulateSeed: Math.random() });
  }

  onRealDataClicked() {
    this.setState({ simulateSeed: null });
  }

  render() {
    const {sortStrategyKey} = this.state;
    return (
      <div className="BiasAnalysis">
        {this.renderForSortStrategy(sortStrategyKey)}
      </div>
    );
  }

  renderForSortStrategy(sortStrategyKey) {
    const interactions = this.interactions();
    const sorter = this.currentSorter();
    const chartDataForProfileName = createChartData(interactions, {
      swipeGroupFn: profileNameFromSwipe,
      ratingGroupFn: profileNameFromRating
    }, sorter);
    const chartDataForProfileKey = createChartData(interactions, {
      swipeGroupFn: profileKeyFromSwipe,
      ratingGroupFn: profileKeyFromRating
    }, sorter);

    return (
      <div>
        {this.renderSimulationPanel()}
        {this.renderExplanations()}
        {this.renderPanelFor('Name', chartDataForProfileName)}
        {this.renderPanelFor('Profile', chartDataForProfileKey)}
        {this.renderBubbleChart(interactions, chartDataForProfileName, chartDataForProfileKey)}
        {this.renderBubbleChartStats(interactions, chartDataForProfileName, chartDataForProfileKey)}
        {this.renderProfileArgumentChart(interactions, chartDataForProfileName, chartDataForProfileKey)}
      </div>
    );
  }

  renderSimulationPanel() {
    return (
      <div>
        <div className="BiasAnalysis-data-sources">Data</div>
        <div className="BiasAnalysis-button" onClick={this.onSimulateClicked}>simulate!</div>
        <div className="BiasAnalysis-button" onClick={this.onRealDataClicked}>real data please!</div>
      </div>
    );
  }

  renderExplanations() {
    return (
      <div className="BiasAnalysis-compare-panel">
        <div className="BiasAnalysis-legend-panel">
          <div className="BiasAnalysis-legend-title">
            Exposure
            <div className="BiasAnalysis-button" onClick={this.onSortClicked.bind(this, 'exposure')}>sort</div>
          </div>
          This shows the exposure to each condition.  Six profiles were mandatory, while others were only seen by early finishers.
        </div>
        <div className="BiasAnalysis-legend-panel">
          <div className="BiasAnalysis-legend-title">
            Swipe right rate
            <div className="BiasAnalysis-button" onClick={this.onSortClicked.bind(this, 'swipe-percentage')}>sort</div>
          </div>
          {'This shows the "swipe right" percentage for each person and each profile.'}
        </div>
        <div className="BiasAnalysis-legend-panel">
          <div className="BiasAnalysis-legend-title">
            Likelihood to take CS
            <div className="BiasAnalysis-button" onClick={this.onSortClicked.bind(this, 'likelihood-in')}>sort</div>
          </div>
          {'"How likely are they to take CS?"'}
          <div>{Choices.all().map(choice =>
            <div key={choice.choiceText} className="BiasAnalysis-likelihood-choice">
              {choice.choiceIndex}: {choice.choiceText}
            </div>
          )}</div>
        </div>
      </div>
    );
  }

  renderPanelFor(caption, chartDataForProfileName) {
    const {labels, dataPoints} = chartDataForProfileName;
    if (dataPoints.length === 0) return <div>No data points!</div>;

    // Compute
    const exposureMap = {};
    const percentageMap = {};
    labels.forEach(label => {
      const d = __find(dataPoints, d => d.groupKey === label);
      exposureMap[label] = d.swipeCount;
      percentageMap[label] = d.swipeRightPercent;
    });

    return (
      <div className="BiasAnalysis-compare-panel">
        <CountChart
          countMap={exposureMap}
          chartTitle={`Exposure by ${caption}`}
        />
        <PercentageChart
          percentageMap={percentageMap}
          chartTitle={`Swipe Rights by ${caption}`}
        />
        <RatingsChart
          labels={labels}
          dataPoints={dataPoints}
          chartTitle={`"How likely are they to take CS?" by ${caption}`}
        />
      </div>
    );
  }

  renderBubbleChart(consentedInteractions, chartDataForProfileName, chartDataForProfileKey) {
    return <BubbleChart
      consentedInteractions={consentedInteractions}
      chartDataForProfileName={chartDataForProfileName}
      chartDataForProfileKey={chartDataForProfileKey}
      cellKey="bubbles" />;
  }

  renderBubbleChartStats(consentedInteractions, chartDataForProfileName, chartDataForProfileKey) {
    return <BubbleChart
      consentedInteractions={consentedInteractions}
      chartDataForProfileName={chartDataForProfileName}
      chartDataForProfileKey={chartDataForProfileKey}
      cellKey="numbers" />;
  }

  renderProfileArgumentChart(consentedInteractions, chartDataForProfileName, chartDataForProfileKey) {
    return <ProfileArgumentChart
      consentedInteractions={consentedInteractions}
      chartDataForProfileName={chartDataForProfileName}
      chartDataForProfileKey={chartDataForProfileKey} />;
  }
}
BiasAnalysis.propTypes = {
  consentedInteractions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BiasAnalysis;