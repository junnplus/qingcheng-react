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
        return (
            <div>
                <TopNav current_user={current_user} />
                { React.cloneElement(this.props.children, {current_user: current_user}) }
                <Footer />
                {
                    (function(obj){
                        if (obj.state.showLogin && !current_user.id )
                            return <Overlay><LoginForm /></Overlay>;
                    }(this))
                }
            </div>
        );
    }
});

module.exports = App;
