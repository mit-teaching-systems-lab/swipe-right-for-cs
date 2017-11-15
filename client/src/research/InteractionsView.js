import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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

// Render a list of logged user interactions
class InteractionsView extends Component {
  totalSwipes(interactions, key){
    return _.countBy(interactions, row => row.interaction.turn[key]);
  }

  percentRightPerProfile(interactions, key){
    var totals = {};
    var percents = {};
    interactions.forEach(row =>{
      if (row.interaction.type === InteractionTypes.SWIPE_RIGHT || row.interaction.type === InteractionTypes.SWIPE_LEFT){
        if (!(row.interaction.turn[key] in totals)){
          totals[row.interaction.turn[key]] = [0,0];
        }
        if (row.interaction.type === InteractionTypes.SWIPE_RIGHT){ 
          totals[row.interaction.turn[key]][0] += 1;
        }
        totals[row.interaction.turn[key]][1] += 1;
      }
    });
    for(var k in totals){
      percents[k] = totals[k][0]/totals[k][1]*100;
    }
  }

  percentRightPerProfile(interactions, key){
    const numSwipes = this.totalSwipes(interactions, key);
    const rightSwipes = _.countBy(this.rightSwipes(interactions), row => row.interaction.turn[key]);
    var percents = {};

    for(var x in numSwipes){
      percents[x] = rightSwipes[x]/numSwipes[x]*100;
    }
    return percents;
  }
  rightSwipes(interactions){
    return interactions.filter(row =>{
      if (row.interaction.type === InteractionTypes.SWIPE_RIGHT) return true;
      return false;
    });
  }

  onlySwipes(){
    //filter out testing data
    const interactions = this.props.interactions.filter(row =>{  
      if (row.session.workshopCode === 'foo') return false;
      if (row.session.workshopCode === 'demo') return false;
      if (row.session.workshopCode === 'code.org') return false;
      if (row.session.workshopCode.indexOf('DEMO') === 0) return false;
      if (row.session.identifier === 'UNKNOWN_IDENTIFIER') return false;
      if (row.session.identifier === '') return false;
      if (row.session.identifier === 'kevin') return false;
  }

  render() {  
    const interactions = withoutDemoInteractions(this.props.interactions);
    const swipeInteractions = onlySwipes(interactions);

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
    const percents = this.percentRightPerProfile(interactions, key);
    return <pre> {JSON.stringify(percents, null,2)} </pre>;
  }

  renderBarChart(interactions, key, title){
    const p = this.percentRightPerProfile(interactions, key);
    const swipes = this.totalSwipes(interactions, key); 
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
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          domain={{x: [0, 100], y: [0, barLabels.length]}}
          style={{ parent: { maxWidth: "50%" } }}
          padding={{ left: 90, top: 50, right: 90, bottom: 50 }}
        >
          <VictoryLabel text= {title} x={225} y={30} textAnchor="middle"/>
          <VictoryAxis dependentAxis tickValues={barIndices} tickFormat={barLabels}/>
          <VictoryAxis/>
          <VictoryGroup horizontal
            offset={1}
            style={{ data: { width: 3 } }}
            colorScale={["tomato", "gold"]}
          >
            <VictoryBar
              data= {dataPoints}
              labels={(data)=>(Number(data.y)).toFixed(2) + "% of " + data.totalSwipes}
              domain={{y: [0, 5.5]}}
              style={{ parent: { maxWidth: "50%" } }} />
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}
InteractionsView.propTypes = {
  interactions: PropTypes.array.isRequired
};

export default InteractionsView;