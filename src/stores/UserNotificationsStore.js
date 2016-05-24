import Reflux from 'reflux';
import UserNotificationsActions from '../actions/UserNotificationsActions';
import ShowOverlayActions from '../actions/ShowOverlayActions';
import api from '../api';

var UserNotificationsStore = Reflux.createStore({
  listenables: UserNotificationsActions,
  getInitialState() {
    this.notifications = [];
    return this.notifications;
  },
  onFetchNotifications() {
    api.notification.list((resp) => {
      this.notifications = resp.data;
      this.pagination = resp.pagination;
      this.trigger(this.notifications);
    });
  },
  onClearNotifications() {
    api.notification.flush(() => {
      this.notifications = [];
      this.trigger(this.notifications);
      ShowOverlayActions.showNotifications(false);
    });
  }
});

export default UserNotificationsStore;
