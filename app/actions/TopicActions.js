var Reflux = require('reflux');

var TopicActions = Reflux.createActions([
    'load',
    'like',
    'unlike',
    'viewRaw'
]);

module.exports = TopicActions;
