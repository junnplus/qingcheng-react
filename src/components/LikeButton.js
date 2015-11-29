var React = require('react');
var ShowOverlayActions = require('../actions/ShowOverlayActions');
var TopicActions = require('../actions/TopicActions');

var LikeButton = React.createClass({
    toggleLike: function() {
        if ( !this.props.current_user.id ) {
            ShowOverlayActions.showLogin(true);
        }
        if ( this.props.topic.liked_by_me ) {
            TopicActions.unlike(this.props.topic.id);
        } else {
            TopicActions.like(this.props.topic.id);
        }
    },
    render: function() {
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
