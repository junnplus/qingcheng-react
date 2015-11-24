var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var FetchActions = require('../actions/FetchActions');
var CommentsActions = require('../actions/CommentsActions');
var api = require('../api');

var TopicStore = Reflux.createStore({
    listenables: TopicActions,
    getInitialState: function() {
        return {
            topic: {
                user: {},
                webpage: {},
                cafe: {},
				liked_by_me: false
			}
        };
    },
    onLoad: function(tid) {
        api.topic.view(tid, function(resp) {
			this.topic = resp;
            this.trigger(this.topic);
            FetchActions.fetching(false);
            CommentsActions.fetchTopicComments(tid);
        }.bind(this));
    },
    onLike: function(tid) {
        api.topic.like(tid, function() {
            this.topic.liked_by_me = true;
            this.trigger(this.topic);
        }.bind(this));
    },
	onUnlike: function(tid) {
        api.topic.unlike(tid, function() {
            this.topic.liked_by_me = false;
            this.trigger(this.topic);
        }.bind(this));
	}
});

module.exports = TopicStore;
