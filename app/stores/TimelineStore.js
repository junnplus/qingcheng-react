var Reflux = require('reflux');
var TimelineActions = require('../actions/TimelineActions');
var FetchActions = require('../actions/FetchActions');
var api = require('../api');

var TimelineStore = Reflux.createStore({
    listenables: TimelineActions,
	getInitialState: function () {
        this.topics = [];
        return this.topics;
    },
    onFetchTimeline: function(params) {
        params = params || {};
		api.timeline(params, function(resp) {
			this.topics = this.topics.concat(resp.data);
            this.cursor = resp.cursor;
            this.trigger(this.topics);
            FetchActions.fetching(false);
        }.bind(this));
    },
    onFetchTopics: function(params) {
        params = params || {};
		if (this.cursor) params.cursor = this.cursor;
		api.timeline(params, function(resp) {
			this.topics = this.topics.concat(resp.data);
			this.cursor = resp.cursor;
            this.trigger(this.topics);
            FetchActions.fetching(false);
		}.bind(this));
    },
});

module.exports = TimelineStore;
