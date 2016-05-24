import React from 'react';
import Reflux from 'reflux';
import {ReactRouter, Link} from 'react-router';
import Logo from './Logo';
import ShowOverlayActions from '../actions/ShowOverlayActions';
import UserSessionActions from '../actions/UserSessionActions';
import UserNotificationsStore from '../stores/UserNotificationsStore';
import ShowOverlayStore from '../stores/ShowOverlayStore';
import UserAvatar from './UserAvatar';
import UserNotifications from './UserNotifications';
import Overlay from './Overlay';
import Dropdown from './Dropdown';

var TopNav = React.createClass({
  mixins: [
    Reflux.connect(UserNotificationsStore, "notifications"),
    Reflux.connect(ShowOverlayStore, "showNotifications")
  ],
  contextTypes: {
    current_user: React.PropTypes.object
  },
  getInitialState() {
    return {
      showUserDropdown: false,
    };
  },
  handleClose(e) {
    this.setState({showUserDropdown:false});
  },
  handleChoose(e) {
    this.setState({showUserDropdown:false});
  },
  handleShowLogin() {
    ShowOverlayActions.showLogin(true);
  },
  handleShowNotifications(e) {
    e.preventDefault();
    ShowOverlayActions.showNotifications(true);
  },
  viewUserDropdown(e) {
    e.preventDefault();
    this.setState({showUserDropdown:true});
  },
  handleLogout(e) {
    e.preventDefault();
    UserSessionActions.logout();
  },
  render() {
    var current_user = this.context.current_user;
    var notifications = this.state.notifications;
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
            {
              ((obj) => {
                if ( notifications.length ) {
                  return <Link className="tip notification" to="/" onClick={ obj.handleShowNotifications } aria-label={ "You have " + notifications.length + " unread notifications" }></Link>;
                }
              })(this)
            }
            {
              ((obj) => {
                if ( obj.state.showNotifications && current_user.id ) {
                  return (
                    <Overlay>
                      <UserNotifications notifications={notifications}/>
                    </Overlay>
                  );
                }
              })(this)
            }
          </li>
          <li>
            <UserAvatar user={ current_user } onClick={ this.viewUserDropdown } />
            {
              ((obj) => {
                if ( obj.state.showUserDropdown ) {
                  return (
                    <Dropdown handleClose={obj.handleClose} handleChoose={obj.handleChoose} >
                      <Link className="dropdown-item" to={ "/u/" + current_user.username }>View Profile</Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/account/settings" className="dropdown-item">Settings</Link>
                      <Link to="/session" className="dropdown-item" onClick={ obj.handleLogout }>Logout</Link>
                    </Dropdown>
                  );
                }
              })(this)
            }
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
