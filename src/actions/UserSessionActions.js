var Reflux = require('reflux');

var UserSessionActions = Reflux.createActions([
  'login',
  'logout',
  'signup',
  'fetchCurrentUser'
]);

module.exports = UserSessionActions;
