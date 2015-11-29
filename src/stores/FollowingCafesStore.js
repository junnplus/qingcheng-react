var Reflux = require('reflux');
var FollowingCafesActions = require('../actions/FollowingCafesActions');
var api = require('../api');

var FollowingCafesStore = Reflux.createStore({
    init: function() {
        this.listenToMany(FollowingCafesActions);
    },
	getInitialState: function() {
        this.following = [];
        return this.following;
	},
    onFollowing: function(following) {
        this.following = following;
        this.trigger(this.following);
    },
});

module.exports = FollowingCafesStore;
