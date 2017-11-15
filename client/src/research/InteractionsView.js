import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InteractionTypes} from '../shared/data.js';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryAxis, VictoryLabel} from 'victory'; 
import _ from 'lodash';
// Render a list of logged user interactions
class InteractionsView extends Component {
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

  totalSwipes(interactions, key){
    return _.countBy(interactions, row => row.interaction.turn[key]);
  }

  percentRightPerProfile(interactions, key){
    const numSwipes = this.totalSwipes(interactions, key);
    var totals = {};
    var percents = {};
    interactions.forEach(row =>{
      if (row.interaction.type === InteractionTypes.SWIPE_RIGHT || row.interaction.type === InteractionTypes.SWIPE_LEFT){
        if (!(row.interaction.turn[key] in totals)){
          totals[row.interaction.turn[key]] = [0,numSwipes[row.interaction.turn[key]]];
        }
        if (row.interaction.type === InteractionTypes.SWIPE_RIGHT){ 
          totals[row.interaction.turn[key]][0] += 1;
        }
      }
    });
    for(var k in totals){
      percents[k] = totals[k][0]/totals[k][1]*100;
    }
    return percents;
  }

  render() {  
    // unpack!
    //filter out testing data
    const interactions = this.onlySwipes();
    // show it!
    //render data as a filterable table
    return( 
      <div>
        {this.renderPercentSwipeRight(interactions)}
        {this.renderPercentRightPerProfile(interactions, 'profileKey')}
        {this.renderPercentRightPerProfile(interactions, 'profileName')}
        {this.renderBarChart(interactions, 'profileName', "Swipes Right Per Person")}
        {this.renderBarChart(interactions, 'profileKey',"Swipes Right Per Profile")}
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
    console.log(swipes);
    var keys=[]; 
    var d =[]; 
    var count = 0;
    var values = [];
    interactions.forEach(row =>{
      if (!(keys.includes(row.interaction.turn[key]))){ 
        keys.push(row.interaction.turn[key]);
        count += 1;
        values.push(count);
        d.push({x: count, y: p[row.interaction.turn[key]], totalSwipes: swipes[row.interaction.turn[key]]}); 
      }
    });

    return (
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          domain={   {x: [0, 100], y: [0, keys.length]}   }
          style={{ parent: { maxWidth: "50%" } }}
          padding={{ left: 90, top: 50, right: 90, bottom: 50 }}
        >
          <VictoryLabel text= {title} x={225} y={30} textAnchor="middle"/>
          <VictoryAxis dependentAxis tickValues={values} tickFormat={keys}/>
          <VictoryAxis/>
          <VictoryGroup horizontal
            offset={1}
            style={{ data: { width: 3 } }}
            colorScale={["tomato", "gold"]}
          >
            <VictoryBar
              data= {d}
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