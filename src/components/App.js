import React from 'react';
import Reflux from 'reflux';
import {ReactRouter, RouteHandler} from 'react-router';
import Overlay from './Overlay';
import LoginForm from './LoginForm';
import ShowOverlayStore from '../stores/ShowOverlayStore';
import UserStore from '../stores/UserStore';
import UserSessionStore from '../stores/UserSessionStore';
import UserSessionActions from '../actions/UserSessionActions';
import Footer from './Footer';
import TopNav from './TopNav';

var App = React.createClass({
  mixins: [
    Reflux.connect(ShowOverlayStore, "showLogin"),
    Reflux.connect(UserSessionStore, "current_user")
  ],
  childContextTypes: {
    current_user: React.PropTypes.object.isRequired
  },
  getChildContext() {
    return {
      current_user: this.state.current_user
    };
  },
  componentDidMount() {
    UserSessionActions.fetchCurrentUser();
  },
  render() {
    var current_user = this.state.current_user;
    return (
      <div>
        <TopNav />
        { this.props.children }
        <Footer />
        {
          ((obj) => {
            if (obj.state.showLogin && !current_user.username)
              return <Overlay><LoginForm /></Overlay>;
          })(this)
        }
      </div>
    );
  }
});

module.exports = App;
