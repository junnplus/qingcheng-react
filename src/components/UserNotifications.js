import React from 'react';
import NoticeItem from './NoticeItem';
import UserNotificationsActions from '../actions/UserNotificationsActions';

var UserNotifications = React.createClass({
    handleClearNotifications() {
      UserNotificationsActions.clearNotifications();
    },
    render() {
		var notifications = this.props.notifications.map((item, index) => {
			return <NoticeItem key={index} notice={item} />;
		});
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
