var Reflux = require('reflux');
var UserSessionActions = require('../actions/UserSessionActions');
var ShowLoginActions = require('../actions/ShowLoginActions');
var api = require('../api');

var UserSessionStore = Reflux.createStore({
    listenables: UserSessionActions,
    getInitialState: function() {
        this.user = {
            username: ''
        };
        return this.user;
    },
    onLogin: function(data) {
        api.user.login(data, function(resp) {
            this.user = resp;
            this.trigger(this.user);
            ShowLoginActions.showLogin(false);
        }.bind(this));
    },
    onLogout: function() {
        api.user.logout(function(){
            this.user = {};
            this.trigger(this.user);
        }.bind(this));
    },
    onFetchCurrentUser: function() {
        api.user.profile('me', function(resp) {
            this.user = resp;
            this.trigger(this.user);
        }.bind(this));
    }
});

module.exports = UserSessionStore;
