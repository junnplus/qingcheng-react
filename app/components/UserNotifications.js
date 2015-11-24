var React = require('react');
var NoticeItem = require('./NoticeItem');
var UserNotificationsActions = require('../actions/UserNotificationsActions');

var UserNotifications = React.createClass({
    handleClearNotifications: function() {
        UserNotificationsActions.clearNotifications();
    },
    render: function() {
		var notifications = this.props.notifications.map(function(item, index){
			return <NoticeItem key={index} notice={item} />;
		}.bind(this));
        return (
			<div className="notification-list">
				<h2>Notifications</h2>
				{ notifications }
				<div className="clear-button">
					<button className="button buttong--green" onClick={this.handleClearNotifications}>Clear</button>
				</div>
			</div>
        );
    }
});

module.exports = UserNotifications;
