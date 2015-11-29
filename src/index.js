var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var history = require('./history');

var routes = require('./routes');

ReactDOM.render(<Router history={history} routes={routes}></Router>, document.getElementById('qingcheng'));
