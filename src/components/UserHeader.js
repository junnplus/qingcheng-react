var React = require('react');
var UserAvatar = require('./UserAvatar');

var UserHeader = React.createClass({
    render: function() {
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
