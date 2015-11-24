var React = require('react');
var NoticeItem = require('./NoticeItem');

var UserNotifications = React.createClass({
    render: function() {
		var notifications = this.props.notifications.map(function(item, index){
			return <NoticeItem key={index} notice={item} />;
		}.bind(this));
        return (
			<div className="notification-list">
				<h2>Notifications</h2>
				{ notifications }
				<div className="clear-button">
					<button className="button buttong--green">Clear</button>
				</div>
			</div>
        );
    }
});

module.exports = UserNotifications;
