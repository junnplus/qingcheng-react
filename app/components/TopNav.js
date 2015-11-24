var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Logo = require('./Logo');
var ShowOverlayActions = require('../actions/ShowOverlayActions');
var UserSessionActions = require('../actions/UserSessionActions');
var UserNotificationsStore = require('../stores/UserNotificationsStore');
var ShowOverlayStore = require('../stores/ShowOverlayStore');
var UserAvatar = require('./UserAvatar');
var UserNotifications = require('./UserNotifications');
var Overlay = require('./Overlay');
var Dropdown = require('./Dropdown');

var TopNav = React.createClass({
    mixins: [
        Reflux.connect(UserNotificationsStore, "notifications"),
        Reflux.connect(ShowOverlayStore, "showNotifications")
    ],
	getInitialState: function() {
        return {
            showUserDropdown: false,
        };
	},
    propTypes: {
        current_user: React.PropTypes.shape().isRequired,
    },
    getDefaultProps: function() {
        return {
            current_user: {},
        };
    },
    handleClose: function(e) {
        this.setState({showUserDropdown:false});
    },
    handleChoose: function(e) {
        this.setState({showUserDropdown:false});
    },
    handleShowLogin: function() {
        ShowOverlayActions.showLogin(true);
    },
    handleShowNotifications: function(e) {
        e.preventDefault();
        ShowOverlayActions.showNotifications(true);
    },
	viewUserDropdown: function(e) {
        e.preventDefault();
        this.setState({showUserDropdown:true});
	},
    handleLogout: function(e) {
        e.preventDefault();
        UserSessionActions.logout();
    },
    render: function() {
        var current_user = this.props.current_user;
        var notifications = this.state.notifications;
        var dropdown;
        if ( this.state.showUserDropdown ) {
            dropdown = (
                <Dropdown handleClose={this.handleClose} handleChoose={this.handleChoose} >
                    <Link className="dropdown-item" to={ "/u/" + current_user.username }>View Profile</Link>
                    <div className="dropdown-divider"></div>
                    <Link to="/account/settings" className="dropdown-item">Settings</Link>
                    <Link to="/session" className="dropdown-item" onClick={ this.handleLogout }>Logout</Link>
                </Dropdown>
            );
        }
        var notificationCount;
        if ( notifications.length ) {
            notificationCount = <Link className="tip notification" to="/" onClick={ this.handleShowNotifications } aria-label={ "You have " + notifications + " unread notifications" }></Link>;
        }
        var overlay;
        if ( this.state.showNotifications && current_user.id ) {
            overlay = (
                <Overlay>
                    <UserNotifications notifications={notifications}/>
                </Overlay>
            );
        }
        var nav;
        if (!current_user.username) {
            nav = (
                <div className="nav">
                    <button className="button" onClick={this.handleShowLogin}>Log in</button>
                </div>
            );
        } else {
            nav = (
				<ul className="nav clearfix">
					<li>
                        { notificationCount }
                        { overlay }
					</li>
					<li>
						<UserAvatar user={ current_user } onClick={ this.viewUserDropdown } />
                        { dropdown }
					</li>
				</ul>
            );
        }
        return (
            <div className="top-nav">
                <div className="container">
                    <div className="site-nav clearfix">
                        <Link to="/" className="site-logo v-link-active">
                            <Logo />
                        </Link>
                        <nav>
                            <Link to="/c/about"> About </Link>
                        </nav>
                    </div>
                    <div className="site-account">
						{ nav }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TopNav;
