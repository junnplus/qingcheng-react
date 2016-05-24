import Reflux from 'reflux';
import TopicsActions from '../actions/TopicsActions';
import FetchActions from '../actions/FetchActions';
import api from '../api';

var TopicsStore = Reflux.createStore({
  listenables: TopicsActions,
  getInitialState() {
    this.topics = [];
    return this.topics;
  },
  onFetchCafeTopics(slug) {
    var params = {};
    params.slug = slug;
    params.page = 1;
    api.cafe.topics(params.slug, params.page, (resp) => {
      this.topics = resp.data;
      this.trigger(this.topics);
      FetchActions.fetching(false);
    });
  },
  onFetchUserTopics(username) {
    var params = {};
    params.username = username;
    api.user.topics(params.username, 0, (resp) => {
    this.topics = resp.data;
      this.cursor = resp.cursor;
      this.trigger(this.topics);
      FetchActions.fetching(false);
    });
  },
  onFetchTopics(username) {
    api.user.topics(username, this.cursor, (resp) => {
      this.topics = this.topics.concat(resp.data);
      this.cursor = resp.cursor;
      this.trigger(this.topics);
      FetchActions.fetching(false);
    });
  },
});

export default TopicsStore;
