var Reflux = require('reflux');
var TopicsActions = require('../actions/TopicsActions');
var FetchActions = require('../actions/FetchActions');
var api = require('../api');
var $ = require('jquery');

var TopicsStore = Reflux.createStore({
    listenables: TopicsActions,
	getInitialState: function () {
        this.topics = [];
        return this.topics;
    },
    onFetchCafeTopics: function(slug) {
		var params = {};
		params.slug = slug;
		params.page = 1;
		api.cafe.topics(params.slug, params.page, function(resp) {
			this.topics = resp.data;
            this.trigger(this.topics);
            FetchActions.fetching(false);
        }.bind(this));
    },
    onFetchUserTopics: function(username) {
		var params = {};
		params.username = username;
        api.user.topics(params.username, 0, function(resp) {
			this.topics = resp.data;
            this.cursor = resp.cursor;
            this.trigger(this.topics);
            FetchActions.fetching(false);
        }.bind(this));
    },
    onFetchTopics: function(username) {
		api.user.topics(username, this.cursor, function(resp) {
			this.topics = this.topics.concat(resp.data);
			this.cursor = resp.cursor;
            this.trigger(this.topics);
            FetchActions.fetching(false);
		}.bind(this));
    },
});

module.exports = TopicsStore;
