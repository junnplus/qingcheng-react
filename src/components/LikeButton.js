import React from 'react';
import ShowOverlayActions from '../actions/ShowOverlayActions';
import TopicActions from '../actions/TopicActions';

var LikeButton = React.createClass({
  toggleLike() {
    if ( !this.props.current_user.id ) {
      ShowOverlayActions.showLogin(true);
    }
    if ( this.props.topic.liked_by_me ) {
      TopicActions.unlike(this.props.topic.id);
    } else {
      TopicActions.like(this.props.topic.id);
    }
  },
  render() {
    var topic = this.props.topic;
    return (
      <button className={ topic.liked_by_me ? "button button--white like-button liked" : "button button--white like-button" } onClick={this.toggleLike}>
        <i className="qc-icon-heart"></i>
        <span>Like it</span>
      </button>
    );
  }
});

module.exports = LikeButton;
