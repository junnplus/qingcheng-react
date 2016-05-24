import Reflux from 'reflux';
import CommentsActions from '../actions/CommentsActions';
import FetchActions from '../actions/FetchActions';
import api from '../api';

var CommentsStore = Reflux.createStore({
  listenables: CommentsActions,
  init() {
    this.data = {
      comments: [],
      cursor: 0
    }
  },
  getInitialState() {
    return this.data;
  },
  onFetchTopicComments(tid, cursor) {
    api.topic.comments(tid, cursor, (resp) => {
      this.data.comments = this.data.comments.concat(resp.data);
      this.data.cursor = resp.cursor;
      this.trigger(this.data);
    });
  },
  onCreateTopicComment(tid, payload, cb) {
    api.comment.create(tid, payload, (resp) => {
      this.data.comments = [resp].concat(this.data.comments);
      this.trigger(this.data);
      cb && cb();
    });
  },
  onDeleteTopicComment(tid, cid) {
    api.comment.delete(tid, cid, () => {
      this.data.comments = [];
      CommentsActions.fetchTopicComments(tid);
    });
  }
});

export default CommentsStore;
