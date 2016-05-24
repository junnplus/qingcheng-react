var Reflux = require('reflux');

var UserNotificationsActions = Reflux.createActions([
  'fetchNotifications',
  'clearNotifications'
]);

module.exports = UserNotificationsActions;
