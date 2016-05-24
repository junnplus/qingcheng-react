import Reflux from 'reflux';
import CafesActions from '../actions/CafesActions';
import FetchActions from '../actions/FetchActions';
import FollowingCafesActions from '../actions/FollowingCafesActions';
import api from '../api';

var CafesStore = Reflux.createStore({
  listenables: CafesActions,
  getInitialState() {
    this.cafes = [];
    return this.cafes;
  },
  onFetchCafes() {
    api.cafe.list((resp) => {
      this.cafes = resp.data;
      this.trigger(this.cafes);
      FollowingCafesActions.following(resp.following || []);
      FetchActions.fetching(false);
    });
  },
});

export default CafesStore;
