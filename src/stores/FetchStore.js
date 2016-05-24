import Reflux from 'reflux';
import FetchActions from '../actions/FetchActions';

var FetchStore = Reflux.createStore({
  listenables: FetchActions,
  getInitialState() {
    this.fetching = true;
    return this.fetching;
  },
  onFetching(fetching) {
    this.fetching = fetching;
    this.trigger(this.fetching);
  },
});

export default FetchStore;
