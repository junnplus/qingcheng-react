var Reflux = require('reflux');

var TopicsActions = Reflux.createActions([
  'fetchCafeTopics',
  'fetchUserTopics',
  'fetchTopics'
]);

module.exports = TopicsActions;
