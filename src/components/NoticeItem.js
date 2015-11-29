var React = require('react');
var UserAvatar = require('./UserAvatar');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var ShowOverlayActions = require('../actions/ShowOverlayActions');

var NoticeItem = React.createClass({
    propTypes: {
        notice: React.PropTypes.shape().isRequired,
    },
    getDefaultProps: function() {
        return {
            notice: {},
        };
    },
    message: function(t) {
        var categories = {
          	comment: 'commented on your topic',
          	like_comment: 'liked your comment',
          	like_topic: 'liked your topic',
          	mention: 'mentioned you on topic',
        };
        return categories[t] || t;
    },
	handleViewNotice: function() {
		ShowOverlayActions.showNotifications(false);
	},
    render: function() {
		var notice = this.props.notice;
        return (
			<div className="item-container">
			  	<UserAvatar user={ notice.sender} />
			  	<div className="item-content">
					<div className="item-info">{ this.message(notice.category) }</div>
					<Link className="topic-title" to={ "/t/" + notice.topic.id } onClick={this.handleViewNotice}>{ notice.topic.title }</Link>
			  	</div>
			</div>
        );
    }
});

module.exports = NoticeItem;
