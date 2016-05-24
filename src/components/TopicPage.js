import React from 'react';
import Reflux from 'reflux';
import TopicHentry from './TopicHentry';
import FetchStore from '../stores/FetchStore';
import FetchActions from '../actions/FetchActions';
import TopicActions from '../actions/TopicActions';
import TopicStore from '../stores/TopicStore';
import CommentsStore from '../stores/CommentsStore';
import Logo from './Logo';
import CommentBox from './CommentBox';
import CommentsActions from '../actions/CommentsActions';

var TopicPage = React.createClass({
  mixins: [
    Reflux.connect(TopicStore, "topic"),
    Reflux.connect(FetchStore, "fetching"),
    Reflux.connect(CommentsStore)
  ],
  fetchTopicComments() {
    CommentsActions.fetchTopicComments(this.props.params.tid, this.state.cursor);
  },
  componentDidMount() {
    var tid = this.props.params.tid;
    TopicActions.load(tid, () => {
      this.fetchTopicComments();
    });
  },
  componentWillReceiveProps(nextProps) {
    var newId = nextProps.params.tid;
    var oldId = this.props.params.tid;
    if ( oldId !== newId ) {
      this.setState({comments: []});
      FetchActions.fetching(true);
      TopicActions.load(newId, () => {
        this.fetchTopicComments();
      });
    }
  },
  render() {
  var topic = this.state.topic;
    var current_user = this.props.current_user;
    var comments = this.state.comments;
    return (
      <div className="body">
        {
          ((obj) => {
            if ( obj.state.fetching ) {
              return (
                <div className="entry-view">
                  <Logo clazz={ "loading center" } />;
                </div>
              )
            } else {
                return (
                  <div className="entry-view">
                    <TopicHentry topic={ topic } />;
                    <CommentBox comments={ comments } topic={ topic } cursor={ this.state.cursor } fetchTopicComments={ this.fetchTopicComments }/>;
                  </div>
                )
            }
          })(this)
        }
      </div>
    );
  }
});

module.exports = TopicPage;
