import Reflux from 'reflux';
import TimelineActions from '../actions/TimelineActions';
import FetchActions from '../actions/FetchActions';
import api from '../api';

var TimelineStore = Reflux.createStore({
  listenables: TimelineActions,
  getInitialState() {
    this.topics = [];
    this.cursor = 0;
    return this.topics;
  },
  onFetchTimeline(params) {
    params = params || {};
    params.cursor = this.cursor ? this.cursor : 0;
    api.timeline(params, (resp) => {
      this.topics = this.topics.concat(resp.data);
      this.cursor = resp.cursor;
      this.trigger(this.topics);
      FetchActions.fetching(false);
    });
  },
  onResetTimeline() {
    this.topics = [];
    this.cursor = 0;
  },
});

export default TimelineStore;
