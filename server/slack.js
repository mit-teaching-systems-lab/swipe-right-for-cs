const fetch = require('node-fetch');

// Drop a message in Slack
module.exports = function tellSlack(webhookUrl, text) {
  console.log('Slack: ', text);
  fetch(webhookUrl, {
    method: 'post',
    body: JSON.stringify({
      username: "swipe-right-for-robots",
      icon_emoji: ":robot_face:", // eslint-disable-line camelcase
      text: text
    })
  })
    .catch((err) => console.log('Error.', err))
    .then(() => console.log('Done.'));
};