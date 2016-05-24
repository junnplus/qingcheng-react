import React from 'react';
import Reflux from 'reflux';
import Header from './Header';
import UserActions from '../actions/UserActions';
import UserStore from '../stores/UserStore';
import TopicList from './TopicList';
import TopicsActions from '../actions/TopicsActions';
import TopicsStore from '../stores/TopicsStore';
import {urlize} from '../filters';

var UserPage = React.createClass({
  mixins: [
    Reflux.connect(UserStore, "user"),
    Reflux.connect(TopicsStore, "topics"),
  ],
  componentDidMount() {
    var username = this.props.params.username;
    UserActions.fetchUser(username);
    TopicsActions.fetchUserTopics(username);
  },
  render() {
    var user = this.state.user;
    return (
      <div className="user-view">
        <Header title={user.username} description={urlize(user.description)} path="user" user={user}/>
        <div className="body">
          <div className="split-view container">
            <div className="main-view">
                <TopicList topics={this.state.topics} user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserPage;
