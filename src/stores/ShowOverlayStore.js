import Reflux from 'reflux';
import ShowOverlayActions from '../actions/ShowOverlayActions';

var ShowOverlayStore = Reflux.createStore({
  listenables: ShowOverlayActions,
  getInitialState() {
    this.show = false;
    return this.show;
  },
  onShowLogin(show) {
    this.show = show;
    this.trigger(this.show);
  },
  onShowNotifications(show) {
    this.show = show;
    this.trigger(this.show);
  }
});

export default ShowOverlayStore;
