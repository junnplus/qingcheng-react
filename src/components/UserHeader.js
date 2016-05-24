import React from 'react';
import UserAvatar from './UserAvatar';

var UserHeader = React.createClass({
  render() {
  var user = this.props.user;
    return (
      <div className="item-container container">
        <UserAvatar user={ user } />
        <div className="item-content">
          <h2>{ user.name }</h2>
          <p>{ user.description }</p>
        </div>
      </div>
    );
  }
});

module.exports = UserHeader;
