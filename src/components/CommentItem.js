import React from 'react';
import {ReactRouter, Link} from 'react-router';
import {timeago} from '../filters';
import UserAvatar from './UserAvatar';
import CommentsActions from '../actions/CommentsActions';

var CommentItem = React.createClass({
  getInitialState () {
    return {
      isHide: false
    };
  },
  isOwner() {
    return this.props.current_user.id === this.props.comment.user.id;
  },
  handleToggleLike() {
    var comment = this.props.comment;
    if (comment.liked_by_me) {
    } else {
    }
  },
  handleFlagComment() {
    if (confirm('Are you sure to report this comment?')) {
    }
  },
  handleDeleteComment() {
    if (confirm('Are you sure to delete this comment?')) {
      CommentsActions.deleteTopicComment(this.props.comment.topic_id, this.props.comment.id);
    }
  },
  render() {
    var comment = this.props.comment;
    var user = comment.user;
    return (
      <li id={ "c-" + comment.id } className={ !this.state.isHide ? "comment-item item-container" : "comment-item item-container comment-hide" }>
        <UserAvatar user={ user }/>
        <div className="comment-main item-content">
          <div className="comment-info">
            <Link to={ "/u/" + user.username }>{ user.username }</Link>
            <time>{ timeago(comment.created_at) }</time>
            #{ comment.id }
            <div className="comment-actions">
              {
                ((obj) => {
                  if ( comment.like_count ) {
                    return <span>{ comment.like_count } likes</span>;
                  }
                })(this)
              }
              {
                ((obj) => {
                  if ( !obj.isOwner() ) {
                    return <a className="tip tip-west like-comment" onClick={ obj.handleToggleLike } role="button" aria-label="like this comment"><i className="qc-icon-heart"></i></a>;
                  }
                })(this)
              }
              {
                ((obj) => {
                  if ( !obj.isOwner() ) {
                    return <a role="button" aria-label="report spam" onClick={ obj.handleFlagComment } ><i className="qc-icon-flag"></i></a>;
                  }
                })(this)
              }
              {
                ((obj) => {
                  if ( obj.isOwner() ) {
                    return <a role="button" aria-label="delete comment" onClick={ obj.handleDeleteComment } ><i className="qc-icon-bin"></i></a>;
                  }
                })(this)
              }
            </div>
          </div>
          <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
        </div>
      </li>
    );
  }
});

module.exports = CommentItem;
