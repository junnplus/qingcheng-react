var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require('./components/App');
var HomePage = require('./components/HomePage');
var TopicPage = require('./components/TopicPage');
var TopicEditPage = require('./components/TopicEditPage');
var TopicCreatePage = require('./components/TopicCreatePage');
var CafesPage = require('./components/CafesPage');
var CafePage = require('./components/CafePage');
var UserPage = require('./components/UserPage');

var routes = (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="t/:tid" component={TopicPage} />
        <Route path="t/:tid/edit" component={TopicEditPage} />
        <Route path="c" component={CafesPage} />
        <Route path="c/:slug" component={CafePage} />
        <Route path="c/:slug/create" component={TopicCreatePage} />
        <Route path="u/:username" component={UserPage} />
    </Route>
);

module.exports = routes;
