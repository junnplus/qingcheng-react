var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;
var Overlay = require('./Overlay');
var LoginForm = require('./LoginForm');
var ShowOverlayStore = require('../stores/ShowOverlayStore');
var UserStore = require('../stores/UserStore');
var UserSessionStore = require('../stores/UserSessionStore');
var UserSessionActions = require('../actions/UserSessionActions');
var Footer = require('./Footer');

var TopNav = require('./TopNav');

var App = React.createClass({
    mixins: [
        Reflux.connect(ShowOverlayStore, "showLogin"),
        Reflux.connect(UserSessionStore, "current_user")
    ],
    componentDidMount: function() {
        UserSessionActions.fetchCurrentUser();
    },
    render: function() {
        var current_user = this.state.current_user;
        var overlay;
        if ( this.state.showLogin && !current_user.id) {
            overlay = (
                <Overlay>
                    <LoginForm />
                </Overlay>
            );
        }
        var router = React.cloneElement(this.props.children, {current_user: current_user});
        return (
            <div>
                <TopNav current_user={current_user} />
                { router }
                <Footer />
                {overlay}
            </div>
        );
    }
});

module.exports = App;
