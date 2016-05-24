var Reflux = require('reflux');

var CommentsActions = Reflux.createActions([
  'fetchTopicComments',
  'createTopicComment',
  'deleteTopicComment',
]);

module.exports = CommentsActions;
