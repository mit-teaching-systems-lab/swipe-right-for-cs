import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {InteractionTypes} from '../shared/data.js';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryAxis} from 'victory'; 

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
        {this.renderChart(interactions, 'profileName')}
        {this.renderChart(interactions, 'profileKey')}
        <table>{interactions.map(row =>{
          return <tr key = {row.id}>
            <td> {row.id} </td>
            <td> {row.timestampz} </td>
            <td> {row.interaction.type} </td>   
            <td> {JSON.stringify(row.interaction)} </td>     
          </tr>;
        })}</table>
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
    return <pre>{JSON.stringify(percents, null,2)}</pre>;
  }
  renderChart(interactions, key){
    var keys=[]; 
    var d =[]; 
    var count = 0;
    var values = [];
    interactions.forEach(row =>{
      if (!(keys.includes(row.interaction.turn[key]))){ 
        keys.push(row.interaction.turn[key]);
        count += 1;
        values.push(count);
        d.push({x: count, y: 1}); // we want this 1 to actually equal to the person's average score  
      }
    });

    return (
      <div>
        <VictoryChart
          theme={VictoryTheme.material}
          domain={{y: [0, keys.length]}}
          style={{ parent: { maxWidth: "50%" } }}
        >
          <VictoryAxis dependentAxis={true} tickValues={values} tickFormat={keys}/>
          <VictoryGroup horizontal
            offset={1}
            style={{ data: { width: 3 } }}
            colorScale={["blue", "tomato", "gold"]}
          >
            <VictoryBar
              data= {d}
            />
            <VictoryBar
              data={[
                {x: 1, y: 6.9},
                {x: 2, y: 6.3},
                {x: 3, y: 7.6},
                {x: 4, y: 7.7},
                {x: 5, y: 7.3},
                {x: 6, y: 4.3},
                {x: 7, y: 5.1},
              ]}
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