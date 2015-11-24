var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var FetchActions = require('../actions/FetchActions');
var api = require('../api');

var TopicStore = Reflux.createStore({
    init: function() {
        this.listenTo(TopicActions.load, this.fetchTopic);
    },
    getInitialState: function() {
        return {
            topic: {
                user: {},
                webpage: {},
                cafe: {}
			}
        };
    },
    fetchTopic: function(tid) {
        api.topic.view(tid, function(resp) {
			this.topic = resp;
            this.trigger(this.topic);
            FetchActions.fetching(false);
        }.bind(this));
    },
});

module.exports = TopicStore;
