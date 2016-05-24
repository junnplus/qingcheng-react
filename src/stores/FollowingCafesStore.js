import Reflux from 'reflux';
import FollowingCafesActions from '../actions/FollowingCafesActions';
import api from '../api';

var FollowingCafesStore = Reflux.createStore({
  listenables: FollowingCafesActions,
  getInitialState() {
    this.following = [];
    return this.following;
  },
  onFollowing(following) {
    this.following = following;
    this.trigger(this.following);
  },
});

export default FollowingCafesStore;
