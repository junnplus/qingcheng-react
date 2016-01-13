import Reflux from 'reflux';
import CommentsActions from '../actions/CommentsActions';
import FetchActions from '../actions/FetchActions';
import api from '../api';

var CommentsStore = Reflux.createStore({
    listenables: CommentsActions,
	getInitialState() {
        this.comments = [];
        this.cursor = 0;
        return this.comments;
    },
    onFetchTopicComments(tid) {
        var cursor = this.cursor ? this.cursor : 0;
        api.topic.comments(tid, cursor, (resp) => {
			this.comments = this.comments.concat(resp.data);
            this.cursor = resp.cursor;
            this.trigger(this.comments);
        });
    },
    onCreateTopicComment(tid, payload, cb) {
        api.comment.create(tid, payload, (resp) => {
          	this.comments = [resp].concat(this.comments);
            this.trigger(this.comments);
			cb && cb();
        });
    },
    onDeleteTopicComment(tid, cid) {
	  	api.comment.delete(tid, cid, () => {
            this.comments = [];
            CommentsActions.fetchTopicComments(tid);
	  	});
    }
});

export default CommentsStore;
