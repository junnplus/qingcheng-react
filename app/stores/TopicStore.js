var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var FetchActions = require('../actions/FetchActions');
var $ = require('jquery');

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
		$.ajax({
			type: 'get',
			url: 'https://python-china.org/api/topics/' + tid,
			dataType: 'json',
		}).done(function(resp){
			this.topic = resp;
            this.trigger(this.topic);
            FetchActions.fetching();
		}.bind(this));
    },
});

module.exports = TopicStore;
