var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;
var Overlay = require('./Overlay');
var LoginForm = require('./LoginForm');
var ShowLoginStore = require('../stores/ShowLoginStore');

var TopNav = require('./TopNav');

var App = React.createClass({
    mixins: [
        Reflux.connect(ShowLoginStore, "showLogin"),
    ],
    render: function() {
        var overlay;
        if ( this.state.showLogin ) {
            overlay = (
                <Overlay>
                    <LoginForm />
                </Overlay>
            );
        }
        return (
            <div>
                <TopNav />
                {this.props.children}
                {overlay}
            </div>
        );
    }
});

module.exports = App;
