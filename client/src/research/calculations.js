import _ from 'lodash';
import {InteractionTypes} from '../shared/data.js';


export function rightSwipes(interactions){
  return interactions.filter(row =>{
    if (row.interaction.type === InteractionTypes.SWIPE_RIGHT) return true;
    return false;
  });
}
export function totalSwipes(interactions, key){
  return _.countBy(interactions, row => row.interaction.turn[key]);
}

//This function uses interactions and a given key to compute the percentage of swipes right based on the key (e.g profileName, profileKey)
export function percentRightPerProfile(interactions, key){
  const numSwipes = totalSwipes(interactions, key);
  const rightSwipe = _.countBy(rightSwipes(interactions), row => row.interaction.turn[key]);
  var percents = {};

  for(var x in numSwipes){
    percents[x] = rightSwipe[x]/numSwipes[x]*100;
  }
  return percents;
}
