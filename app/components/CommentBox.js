var React = require('react');
var CommentsActions = require('../actions/CommentsActions');
var CommentItem = require('./CommentItem');
var CommentForm = require('./CommentForm');

var CommentBox = React.createClass({
    fetchComments: function() {
        CommentsActions.fetchTopicComments(this.props.topic.id);
    },
    render: function() {
        var current_user = this.props.current_user;
        var comments = this.props.comments.map(function(item) {
            return <CommentItem key={item.id} comment={item} />;
        }.bind(this));
        var commentsLength = this.props.comments.length;
        var commentsCount, commentList;
        if ( commentsLength ) {
            commentsCount = <div className="comment-list-header">{ commentsLength } responses</div>;
            commentList = (
                <ul>
                    { comments }
                    <li className="load-more" onClick={ this.fetchComments }>Load More</li>
                </ul>
            );
        }
        return (
			<div className="entry-view comment-box">
				<div className="container">
                    <CommentForm current_user={current_user}/>
                    { commentsCount }
                    { commentList }
				</div>
			</div>
        );
    }
});

module.exports = CommentBox;
