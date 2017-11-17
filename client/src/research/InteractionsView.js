import React, { Component } from 'react';
import PropTypes from 'prop-types';
import __countBy from 'lodash/countBy';
import {InteractionTypes} from '../shared/data.js';
import RatingsChart from './RatingsChart';
import WorkshopsAnalysis from './WorkshopsAnalysis';
import RawInteractionsTable from './RawInteractionsTable';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryAxis,
  VictoryLabel
} from 'victory'; 
import './InteractionsView.css';


//filter out testing and demo data
function withoutDemoInteractions(interactions) {
  return interactions.filter(row =>{  
    if (row.session.workshopCode === 'foo') return false;
    if (row.session.workshopCode === 'demo') return false;
    if (row.session.workshopCode === 'code.org') return false;
    if (row.session.workshopCode.indexOf('DEMO') === 0) return false;
    if (row.session.identifier === undefined) return false;
    if (row.session.identifier === 'UNKNOWN_IDENTIFIER') return false;
    if (row.session.identifier === '') return false;
    if (row.session.identifier === 'kevin') return false;
    return true;
  });
}

function isSwipe(row) {
  const type = row.interaction.type;
  return (type === InteractionTypes.SWIPE_RIGHT || type === InteractionTypes.SWIPE_LEFT);
}

function isRightSwipe(row) {
  return (row.interaction.type === InteractionTypes.SWIPE_RIGHT);
}

function totalSwipes(interactions, key){
  return __countBy(interactions, row => row.interaction.turn[key]);
}

function percentRightPerProfile(interactions, key){
  const numSwipes = totalSwipes(interactions, key);
  const rightSwipes = __countBy(interactions.filter(isRightSwipe), row => row.interaction.turn[key]);
  var percents = {};

  for(var x in numSwipes){
    percents[x] = rightSwipes[x]/numSwipes[x]*100;
  }
  return percents;
}

// Render a list of logged user interactions
class InteractionsView extends Component {
  render() {  
    const interactions = withoutDemoInteractions(this.props.interactions);
    const swipeInteractions = interactions.filter(isSwipe);

    if (swipeInteractions.length === 0){
      return <div> No Swipes! </div>;
    }

    return (
      <div className="InteractionsView">
        <h1>Workshops</h1>
        <WorkshopsAnalysis interactions={interactions} />
        
        <h1>Analysis</h1>
        {this.renderPercentSwipeRight(swipeInteractions)}
        {this.renderPercentRightPerProfile(swipeInteractions, 'profileKey')}
        {this.renderPercentRightPerProfile(swipeInteractions, 'profileName')}
        <div className="InteractionsView-compare-panel">
          {this.renderBarChart(swipeInteractions, 'profileName', "Swipes Right Per Person")}
          <RatingsChart
            interactions={interactions}
            groupingKey="profileName"
            chartTitle="How likely are they to take CS? by Person" />
        </div>
        <div className="InteractionsView-compare-panel">
          {this.renderBarChart(swipeInteractions, 'profileKey',"Swipes Right Per Profile")}
          <RatingsChart
            interactions={interactions}
            groupingKey="profileKey"
            chartTitle="How likely are they to take CS? by Profile" />
        </div>
        
        <h1>Raw data</h1>
        <RawInteractionsTable interactions={this.props.interactions} />
      </div>
    );
  }

  renderPercentSwipeRight(interactions){
    var sum = 0;
    interactions.forEach(row =>{
      if (row.interaction.type === InteractionTypes.SWIPE_RIGHT){
        sum += 1;
      }
    });
    return sum/interactions.length*100;
  }

  renderPercentRightPerProfile(interactions, key){
    const percents = percentRightPerProfile(interactions, key);
    return <pre> {JSON.stringify(percents, null,2)} </pre>;
  }

  renderBarChart(interactions, key, title){
    const p = percentRightPerProfile(interactions, key);
    const swipes = totalSwipes(interactions, key); 
    var barLabels=[]; 
    var dataPoints =[]; 
    var barIndices = [];
    interactions.forEach(row =>{
      var rowKey = row.interaction.turn[key];
      if (!(barLabels.includes(rowKey))){ 
        barLabels.push(rowKey); 
        barIndices.push(barIndices.length + 1);
        dataPoints.push({x: barIndices.length, y: p[rowKey], totalSwipes: swipes[rowKey]}); 
      }
    });

    return (
      <VictoryChart
        theme={VictoryTheme.material}
        domain={{x: [0, 100], y: [0, barLabels.length]}}
        padding={{ left: 90, top: 50, right: 90, bottom: 50 }}
      >
        <VictoryLabel text= {title} x={225} y={30} textAnchor="middle"/>
        <VictoryAxis dependentAxis tickValues={barIndices} tickFormat={barLabels}/>
        <VictoryAxis
          tickValues={[0, 20, 40, 60, 80, 100]}
          tickFormat={t => `${Math.round(t)}%`} />
        <VictoryGroup horizontal
          offset={1}
          style={{ data: { width: 3 } }}
          colorScale={["tomato", "gold"]}
        >
          <VictoryBar
            data= {dataPoints}
            labels={(data)=>(Number(data.y)).toFixed(2) + "% of " + data.totalSwipes}
            domain={{y: [0, 5.5]}} />
        </VictoryGroup>
      </VictoryChart>
    );
  }
}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;