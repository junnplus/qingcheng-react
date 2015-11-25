var React = require('react');
var MarkdownArea = require('./MarkdownArea');
var UserAvatar = require('./UserAvatar');
var ShowOverlayActions = require('../actions/ShowOverlayActions');

var CommentForm = React.createClass({
    getInitialState: function() {
        return {
            content: ''
        };
    },
    handleShowLogin: function() {
        ShowOverlayActions.showLogin(true);
    },
    handleChange: function(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    render: function() {
        current_user = this.props.current_user;
        var currentUserAvatar, replyButton;
        if ( current_user.id ) {
            currentUserAvatar = <UserAvatar user={ current_user } clazz="small circle" />;
            replyButton = <button className="button">Reply</button>;
        }
        return (
			<form className="comment-form">
                {
                    (function(obj){
                        if ( !current_user.id ) {
                            return <div className="comment-form-mask" onClick={obj.handleShowLogin}></div>;
                        }
                    }(this))
                }
                { currentUserAvatar }
				<MarkdownArea clazz="comment-item" placeholder="Write your response" current_user={current_user} content={ this.state.content } handleChange={ this.handleChange }></MarkdownArea>
                { replyButton }
			</form>
        );
    }
});

module.exports = CommentForm;
