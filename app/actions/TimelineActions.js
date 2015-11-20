var Reflux = require('reflux');

var TimelineActions = Reflux.createActions([
    'fetchTimeline',
    'fetchTopics'
]);

module.exports = TimelineActions;
