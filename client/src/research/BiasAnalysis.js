import React from 'react';
import PropTypes from 'prop-types';
import __countBy from 'lodash/countBy';
import __sortBy from 'lodash/sortBy';
import __find from 'lodash/find';
import __uniq from 'lodash/uniq';
import __groupBy from 'lodash/groupBy';
import __mapValues from 'lodash/mapValues';
import CountChart from './CountChart';
import PercentageChart from './PercentageChart';
import RatingsChart from './RatingsChart';
import Select from '../util/Select';
import {InteractionTypes, Choices} from '../shared/data.js';
import {isSwipe} from './functions';
import './BiasAnalysis.css';

function profileNameFromSwipe(row) {
  return row.interaction.turn.profileName;
}

function profileNameFromRating(row) {
  return row.interaction.student.profileName;
}

function profileKeyFromSwipe(row) {
  return row.interaction.turn.profileKey;
}

function profileKeyFromRating(row) {
  return row.interaction.student.profileKey;
}

function isRightSwipe(row) {
  return (row.interaction.type === InteractionTypes.SWIPE_RIGHT);
}

function isRating(row) {
  return (row.interaction.type === InteractionTypes.STUDENT_RATING);
}

// we want:
//  by profileKey: [{groupKey, swipeCount, swipeRightPercent, ratings: [{0: percent, 1: percent, 2: percent}]}]
//  by profileName: [{groupKey, swipeCount, swipeRightPercent, ratings: [{0: percent, 1: percent, 2: percent}]}]
function createChartData(allInteractions, groupFns, sorter) {
  // computeChartData(interactions, sorter, row => row.interaction.turn.profileName)
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
  const ratingsDataByKey = computeRatingsMap(allInteractions, ratingGroupFn);

  // splice back together
  const groupKeys = __uniq(Object.keys(ratingsDataByKey).concat(Object.keys(swipeDataByKey)));
  const labels = groupKeys;
  const dataPoints = groupKeys.map(groupKey => {
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

  // sort these
  // TODO(kr)

  return {labels, dataPoints};
}


// Returns {groupKey: [{ratingValue, percentage}]
function computeRatingsMap(allInteractions, groupFn) {
  const ratingInteractions = allInteractions.filter(isRating);
  return __mapValues(__groupBy(ratingInteractions, groupFn), interactions => {
    const totalRatingsCount = interactions.length;
    const ratingCountMap = __countBy(interactions, row => row.interaction.choiceIndex);
    return Object.keys(ratingCountMap).map(ratingValue => {
      const ratingCount = ratingCountMap[ratingValue];
      const percentage = ratingCount / totalRatingsCount;
      return {
        ratingValue,
        percentage
      };
    });
  });
}


// function ratingsSorter(sortStrategy, unsortedDataPoints) {
//   const sortByChoiceIndex ={
//     'likelihood-in': '0',
//     'likelihood-another-nudge': '2',
//     'exposure': '1', //TODO(kr)
//     'swipes': '1'//TODO(kr)
//   }[sortStrategy.key];
//   const unsortedLabels = __uniq(unsortedDataPoints.map(d => d.x));
//   const labels = __sortBy(unsortedLabels, label => {
//     const d = unsortedDataPoints.find(d => d.ratingValue === sortByChoiceIndex && d.x === label);
//     return d.y;
//   });
//   const dataPoints = __sortBy(unsortedDataPoints, d => labels.indexOf(d.x));
//   return {labels, dataPoints};
// }




// Shows the analysis about bias related to gender, race, ethnicity
// for swiping and for expectations about taking CS.
class BiasAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.renderForSortStrategy = this.renderForSortStrategy.bind(this);
  }

  render() {
    const sortStrategyKeys = [
      'likelihood-in',
      'likelihood-another-nudge'
      // 'exposure',
      // 'swipes'
    ];
    return (
      <div className="BiasAnalysis">
        <Select values={sortStrategyKeys} render={this.renderForSortStrategy} />
      </div>
    );
  }

  renderForSortStrategy(sortStrategyKey) {
    const {consentedInteractions} = this.props;
    const chartDataForProfileName = createChartData(consentedInteractions, {
      swipeGroupFn: profileNameFromSwipe,
      ratingGroupFn: profileNameFromRating
    }, sortStrategyKey);
    const chartDataForProfileKey = createChartData(consentedInteractions, {
      swipeGroupFn: profileKeyFromSwipe,
      ratingGroupFn: profileKeyFromRating
    }, sortStrategyKey);
    return (
      <div>
        {this.renderExplanations()}
        {this.renderPanelFor('Name', chartDataForProfileName)}
        {this.renderPanelFor('Profile', chartDataForProfileKey)}
      </div>
    );
  }

  renderExplanations() {
    return (
      <div className="BiasAnalysis-compare-panel">
        <div className="BiasAnalysis-legend-panel">
          <div className="BiasAnalysis-legend-title">Exposure</div>
          This shows the exposure to each condition.  Six profiles were mandatory, while others were only seen by early finishers.
        </div>
        <div className="BiasAnalysis-legend-panel">
          <div className="BiasAnalysis-legend-title">Swipe right rate</div>
          {'This shows the "swipe right" percentage for each person and each profile.'}
        </div>
        <div className="BiasAnalysis-legend-panel">
          <div className="BiasAnalysis-legend-title">Likelihood to take CS</div>
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
}
BiasAnalysis.propTypes = {
  consentedInteractions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BiasAnalysis;