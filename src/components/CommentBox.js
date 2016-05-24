import React from 'react';
import CommentsActions from '../actions/CommentsActions';
import CommentsStore from '../stores/CommentsStore';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

var CommentBox = React.createClass({
  contextTypes: {
    current_user: React.PropTypes.object
  },
  render() {
    var current_user = this.context.current_user;
    var comments = this.props.comments.map((item, index) => {
      return <CommentItem key={index} comment={item} current_user={current_user} />;
    });
    return (
      <div className="entry-view comment-box">
      {
        ((obj) => {
          if ( obj.props.comments.length ) {
            return (
              <div className="container">
                <CommentForm topic={this.props.topic} />
                <div className="comment-list-header">{ obj.props.comments.length } responses</div>
                <ul>
                  { comments }
                  {
                    ((obj) => {
                      if (obj.props.cursor != 0) {
                        return <li className="load-more" onClick={ this.props.fetchTopicComments }>Load More</li>
                      }
                    })(this)
                  }
                </ul>
              </div>
            )
          } else {
            return (
              <div className="container">
                <CommentForm topic={this.props.topic} />
              </div>
            )
          }
        })(this)
      }
      </div>
    );
  }
});

module.exports = CommentBox;
