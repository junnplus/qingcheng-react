import Reflux from 'reflux';
import TopicActions from '../actions/TopicActions';
import FetchActions from '../actions/FetchActions';
import api from '../api';
import history from '../history';

var TopicStore = Reflux.createStore({
  listenables: TopicActions,
  getInitialState() {
    this.topic = {
      title: '',
      user: {},
      webpage: {},
      cafes: [],
      liked_by_me: false
    };
    return this.topic;
  },
  onLoad(tid, cb) {
    api.topic.view(tid, (resp) => {
    this.topic = resp;
      this.trigger(this.topic);
      FetchActions.fetching(false);
      cb && cb();
    });
  },
  onViewRaw(tid) {
    api.topic.viewRaw(tid, (resp) => {
    this.topic = resp;
      this.trigger(this.topic);
    });
  },
  onLike(tid) {
    api.topic.like(tid, () => {
      this.topic.liked_by_me = true;
      this.trigger(this.topic);
    });
  },
  onUnlike(tid) {
    api.topic.unlike(tid, () => {
      this.topic.liked_by_me = false;
      this.trigger(this.topic);
    });
  },
  onUpdate(tid, payload) {
    api.topic.update(tid, payload, () => {
      history.pushState(null, '/t/' + tid);
    });
  }
});

export default TopicStore;
