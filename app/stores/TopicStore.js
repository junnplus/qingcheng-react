var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var FetchActions = require('../actions/FetchActions');
var api = require('../api');
var history = require('../history');

var TopicStore = Reflux.createStore({
    listenables: TopicActions,
    getInitialState: function() {
        this.topic = {
                title: '',
                user: {},
                webpage: {},
                cafes: [],
				liked_by_me: false
			};
        return this.topic;
    },
    onLoad: function(tid, cb) {
        api.topic.view(tid, function(resp) {
			this.topic = resp;
            this.trigger(this.topic);
            FetchActions.fetching(false);
            cb && cb();
        }.bind(this));
    },
    onViewRaw: function(tid) {
        api.topic.viewRaw(tid, function(resp) {
			this.topic = resp;
            this.trigger(this.topic);
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
	},
    onUpdate: function(tid, payload) {
        api.topic.update(tid, payload, function(){
            history.pushState(null, '/t/' + tid);
        });
    }
});

module.exports = TopicStore;
