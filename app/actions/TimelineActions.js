var Reflux = require('reflux');

var TimelineActions = Reflux.createActions([
    'fetchTimeline',
    'resetCursor'
]);

module.exports = TimelineActions;
