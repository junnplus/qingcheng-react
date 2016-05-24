import Reflux from 'reflux';
import UserSessionActions from '../actions/UserSessionActions';
import ShowOverlayActions from '../actions/ShowOverlayActions';
import UserNotificationsActions from '../actions/UserNotificationsActions';
import api from '../api';

var UserSessionStore = Reflux.createStore({
  listenables: UserSessionActions,
  getInitialState() {
    this.user = {
      username: ''
    };
    return this.user;
  },
  onLogin(data) {
    api.user.login(data, resp => {
      this.user = resp;
      this.trigger(this.user);
      UserNotificationsActions.fetchNotifications();
      ShowOverlayActions.showLogin(false);
    });
  },
  onLogout() {
    api.user.logout(() => {
      this.user = {};
      this.trigger(this.user);
    });
  },
  onSignup(email) {
    api.user.signup(email, resp => {
      // show msg
      ShowOverlayActions.showLogin(false);
    }).error(resp => {
      // show error msg
    });
  },
  onFetchCurrentUser() {
    api.user.profile('me', (resp) => {
      this.user = resp;
      this.trigger(this.user);
      UserNotificationsActions.fetchNotifications();
    });
  }
});

export default UserSessionStore;
