var Reflux = require('reflux');

var CommentsActions = Reflux.createActions([
     'fetchTopicComments',
     'createTopicComment',
]);

module.exports = CommentsActions;
