import Reflux from 'reflux';
import UserActions from '../actions/UserActions';
import ShowOverlayActions from '../actions/ShowOverlayActions';
import api from '../api';

var UserStore = Reflux.createStore({
  listenables: UserActions,
  getInitialState() {
    this.user = {};
    return this.user;
  },
  onFetchUser(username) {
    api.user.profile(username, (resp) => {
      this.user = resp;
      this.trigger(this.user);
    });
  }
});

export default UserStore;
