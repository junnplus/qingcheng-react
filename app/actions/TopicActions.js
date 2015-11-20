var Reflux = require('reflux');

var TopicActions = Reflux.createActions([
    'load',
    'createTopic', 
    'editTopic'
]);

module.exports = TopicActions;
