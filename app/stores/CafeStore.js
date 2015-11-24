var Reflux = require('reflux');
var CafeActions = require('../actions/CafeActions');
var TopicsActions = require('../actions/TopicsActions');
var api = require('../api');

var CafeStore = Reflux.createStore({
    init: function() {
        this.listenToMany(CafeActions);
    },
	getInitialState: function() {
        this.cafe = {};
        return this.cafe;
	},
    onLoad: function(slug) {
		api.cafe.view(slug, function(resp) {
			this.cafe = resp;
            this.trigger(this.cafe);
            TopicsActions.fetchCafeTopics(slug);
		}.bind(this));
    },
});

module.exports = CafeStore;
