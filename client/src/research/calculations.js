import _ from 'lodash';


export function percentRightPerProfile(interactions, key){
  const numSwipes = this.totalSwipes(interactions, key);
  const rightSwipes = _.countBy(this.rightSwipes(interactions), row => row.interaction.turn[key]);
  var percents = {};

  for(var x in numSwipes){
    percents[x] = rightSwipes[x]/numSwipes[x]*100;
  }
  return percents;
}
