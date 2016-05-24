var Reflux = require('reflux');

var TopicActions = Reflux.createActions([
  'load',
  'like',
  'unlike',
  'viewRaw',
  'update'
]);

module.exports = TopicActions;
