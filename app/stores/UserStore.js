var Reflux = require('reflux');
var UserActions = require('../actions/UserActions');
var ShowLoginActions = require('../actions/ShowLoginActions');
var api = require('../api');

var UserStore = Reflux.createStore({
    listenables: UserActions,
    getInitialState: function() {
        this.user = {};
        return this.user;
    },
    onFetchUser: function(username) {
        api.user.profile(username, function(resp) {
            this.user = resp;
            this.trigger(this.user);
        }.bind(this));
    }
});

module.exports = UserStore;
