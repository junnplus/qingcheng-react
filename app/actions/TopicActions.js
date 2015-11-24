var Reflux = require('reflux');

var TopicActions = Reflux.createActions([
    'load',
    'like',
    'unlike',
]);

module.exports = TopicActions;
