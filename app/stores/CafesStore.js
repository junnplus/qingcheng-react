var Reflux = require('reflux');
var CafesActions = require('../actions/CafesActions');
var FetchActions = require('../actions/FetchActions');
var FollowingCafesActions = require('../actions/FollowingCafesActions');
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
            FollowingCafesActions.following(resp.following || []);
            FetchActions.fetching(false);
      	}.bind(this));
    },
});

module.exports = CafesStore;
