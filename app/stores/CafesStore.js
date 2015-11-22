var Reflux = require('reflux');
var CafesActions = require('../actions/CafesActions');
var FetchActions = require('../actions/FetchActions');
var api = require('../api');

var CafesStore = Reflux.createStore({
    init: function() {
        this.listenToMany(CafesActions);
    },
	getInitialState: function() {
        this.cafes = [];
        return this.cafes;
	},
    onFetchCafes: function() {
		api.cafe.list(function(resp) {
          	this.cafes = resp.data;
            this.trigger(this.cafes);
            FetchActions.fetching(false);
      	}.bind(this));
    },
});

module.exports = CafesStore;
