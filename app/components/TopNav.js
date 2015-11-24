var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Logo = require('./Logo');
var ShowLoginActions = require('../actions/ShowLoginActions');
var UserSessionActions = require('../actions/UserSessionActions');
var UserAvatar = require('./UserAvatar');
var Dropdown = require('./Dropdown');

var TopNav = React.createClass({
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
        ShowLoginActions.showLogin(true);
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
						<a className="tip notification" onClick={ this.showNotifications } aria-label={ "You have " + " unread notifications" }></a>
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
