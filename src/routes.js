import React from 'react';
import {ReactRouter, Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import TopicPage from './components/TopicPage';
import TopicEditPage from './components/TopicEditPage';
import TopicCreatePage from './components/TopicCreatePage';
import CafesPage from './components/CafesPage';
import CafePage from './components/CafePage';
import UserPage from './components/UserPage';

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

export default routes;
