var Reflux = require('reflux');
var CommentsActions = require('../actions/CommentsActions');
var FetchActions = require('../actions/FetchActions');
var api = require('../api');

var CommentsStore = Reflux.createStore({
    listenables: CommentsActions,
	getInitialState: function () {
        this.comments = [];
        return this.comments;
    },
    onFetchTopicComments: function(id) {
        cursor = this.cursor ? this.cursor : 0;
        api.topic.comments(id, cursor, function(resp) {
			this.comments = this.comments.concat(resp.data);
            this.cursor = resp.cursor;
            this.trigger(this.comments);
        }.bind(this));
    },
    onCreateTopicComment: function(id, payload, cb) {
        api.comment.create(id, payload, function(resp) {
          	this.comments = [resp].concat(this.comments);
            this.trigger(this.comments);
			cb && cb();
        }.bind(this));
    }
});

module.exports = CommentsStore;
