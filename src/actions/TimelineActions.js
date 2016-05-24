var Reflux = require('reflux');

var TimelineActions = Reflux.createActions([
  'fetchTimeline',
  'resetTimeline'
]);

module.exports = TimelineActions;
