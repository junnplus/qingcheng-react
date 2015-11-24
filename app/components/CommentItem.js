var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var timeago = require('../filters').timeago;
var UserAvatar = require('./UserAvatar');

var CommentItem = React.createClass({
    render: function() {
        var comment = this.props.comment;
        var user = comment.user;
        var like_count;
        if (comment.like_count) {
            like_count = <span>{ comment.like_count } likes</span>;
        }
        return (
			<li id={ "c-" + comment.id } className="comment-item item-container">
				<UserAvatar user={ user }/>
				<div className="comment-main item-content">
                    <div className="comment-info">
                        <Link to={ "/u/" + user.username }>{ user.username }</Link>
                        <time>{ timeago(comment.created_at) }</time>
                        #{ comment.id }
                        <div className="comment-actions">
                            { like_count }
                            <a className="tip tip-west like-comment" role="button" aria-label="like this comment"><i className="qc-icon-heart"></i></a>
                            <a role="button" aria-label="report spam"><i className="qc-icon-flag"></i></a>
                            <a role="button" aria-label="delete comment"><i className="qc-icon-bin"></i></a>
                        </div>
                    </div>
                    <div className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }}></div>
				</div>
			</li>
			);
    }
});

module.exports = CommentItem;
