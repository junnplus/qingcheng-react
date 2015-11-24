var Reflux = require('reflux');
var UserNotificationsActions = require('../actions/UserNotificationsActions');
var api = require('../api');

var UserNotificationsStore = Reflux.createStore({
    listenables: UserNotificationsActions,
	getInitialState: function() {
        this.notifications = [];
        return this.notifications;
	},
    onFetchNotifications: function() {
        api.notification.list(function(resp) {
          	this.notifications = resp.data;
          	this.pagination = resp.pagination;
            this.trigger(this.notifications);
        }.bind(this));
    }
});

module.exports = UserNotificationsStore;
