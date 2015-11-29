var Reflux = require('reflux');

var UserSessionActions = Reflux.createActions([
    'login',
    'logout',
    'fetchCurrentUser'
]);

module.exports = UserSessionActions;
