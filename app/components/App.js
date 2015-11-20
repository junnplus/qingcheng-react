var React = require('react');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var TopNav = require('./TopNav');

var App = React.createClass({
    render: function() {
        return <div><TopNav />{this.props.children}</div>;
    }
});

module.exports = App;
