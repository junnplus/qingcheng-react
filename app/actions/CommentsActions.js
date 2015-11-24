var Reflux = require('reflux');

var CommentsActions = Reflux.createActions([
     'fetchTopicComments',
     'fetchComments',
]);

module.exports = CommentsActions;
