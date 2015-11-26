var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var timeago = require('../filters').timeago;
var UserAvatar = require('./UserAvatar');
var CommentsActions = require('../actions/CommentsActions');

var CommentItem = React.createClass({
    getInitialState: function () {
        return {
            isHide: false
        };
    },
    isOwner: function() {
        return this.props.current_user.id === this.props.comment.user.id;
    },
    handleToggleLike: function() {
        var comment = this.props.comment;
        if (comment.liked_by_me) {
        } else {
        }
    },
    handleFlagComment: function() {
        if (confirm('Are you sure to report this comment?')) {
        }
    },
    handleDeleteComment: function() {
        if (confirm('Are you sure to delete this comment?')) {
            CommentsActions.deleteTopicComment(this.props.comment.topic_id, this.props.comment.id);
        }
    },
    render: function() {
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
                                (function(obj){
                                    if ( comment.like_count ) {
                                        return <span>{ comment.like_count } likes</span>;
                                    }
                                }(this))
                            }
                            {
                                (function(obj){
                                    if ( !obj.isOwner() ) {
                                        return <a className="tip tip-west like-comment" onClick={ obj.handleToggleLike } role="button" aria-label="like this comment"><i className="qc-icon-heart"></i></a>;
                                    }
                                }(this))
                            }
                            {
                                (function(obj){
                                    if ( !obj.isOwner() ) {
                                        return <a role="button" aria-label="report spam" onClick={ obj.handleFlagComment } ><i className="qc-icon-flag"></i></a>;
                                    }
                                }(this))
                            }
                            {
                                (function(obj){
                                    if ( obj.isOwner() ) {
                                        return <a role="button" aria-label="delete comment" onClick={ obj.handleDeleteComment } ><i className="qc-icon-bin"></i></a>;
                                    }
                                }(this))
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
