var Reflux = require('reflux');

var TopicsActions = Reflux.createActions([
    'fetchTimeline',
    'fetchTopics',
    'fetchCafeTopics',
    'fetchUserTopics'
]);

module.exports = TopicsActions;
