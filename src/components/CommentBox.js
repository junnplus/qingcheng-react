import React from 'react';
import CommentsActions from '../actions/CommentsActions';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

var CommentBox = React.createClass({
    contextTypes: {
        current_user: React.PropTypes.object
    },
    fetchComments() {
        CommentsActions.fetchTopicComments(this.props.topic.id);
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
                                    <li className="load-more" onClick={ this.fetchComments }>Load More</li>
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
