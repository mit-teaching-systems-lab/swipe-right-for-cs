import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InteractionTypes} from '../shared/data.js';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryAxis, VictoryLabel} from 'victory'; 
import _ from 'lodash';
// Render a list of logged user interactions
class InteractionsView extends Component {
  totalSwipes(interactions, key){
    return _.countBy(interactions, row => row.interaction.turn[key]);
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
    const interactions = this.props.interactions.filter(row =>{  
      if (row.session.workshopCode === 'foo') return false;
      if (row.session.workshopCode === 'demo') return false;
      if (row.session.workshopCode === 'code.org') return false;
      if (row.session.workshopCode.indexOf('DEMO') === 0) return false;
      if (row.session.identifier === 'UNKNOWN_IDENTIFIER') return false;
      if (row.session.identifier === '') return false;
      if (row.session.identifier === 'kevin') return false;
      return true;
    });
    return interactions.filter(row=>{
      if (row.interaction.type === InteractionTypes.SWIPE_RIGHT || row.interaction.type === InteractionTypes.SWIPE_LEFT){
        return true;
      }
      return false;
    });
  }

  render() {  
    // unpack!
    //filter out testing data
    const swipeInteractions = this.onlySwipes();
    // show it!
    //render data as a filterable table
    if (swipeInteractions.length === 0){
      return <div> No Swipes! </div>;
    }
    return( 
      <div>
        {this.renderPercentSwipeRight(swipeInteractions)}
        {this.renderPercentRightPerProfile(swipeInteractions, 'profileKey')}
        {this.renderPercentRightPerProfile(swipeInteractions, 'profileName')}
        {this.renderBarChart(swipeInteractions, 'profileName', "Swipes Right Per Person")}
        {this.renderBarChart(swipeInteractions, 'profileKey',"Swipes Right Per Profile")}
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
          domain={   {x: [0, 100], y: [0, barLabels.length]}   }
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
            />
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