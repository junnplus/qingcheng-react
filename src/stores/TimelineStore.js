var Reflux = require('reflux');
var TimelineActions = require('../actions/TimelineActions');
var FetchActions = require('../actions/FetchActions');
var api = require('../api');

var TimelineStore = Reflux.createStore({
    listenables: TimelineActions,
	getInitialState: function () {
        this.topics = [];
        this.cursor = 0;
        return this.topics;
    },
    onFetchTimeline: function(params) {
        params = params || {};
        params.cursor = this.cursor ? this.cursor : 0;
		api.timeline(params, function(resp) {
			this.topics = this.topics.concat(resp.data);
            this.cursor = resp.cursor;
            this.trigger(this.topics);
            FetchActions.fetching(false);
        }.bind(this));
    },
    onResetTimeline: function() {
        this.topics = [];
        this.cursor = 0;
    },
});

module.exports = TimelineStore;
