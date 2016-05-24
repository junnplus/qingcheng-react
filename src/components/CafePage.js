import React from 'react';
import {ReactRouter, Link} from 'react-router';
import Reflux from 'reflux';
import Header from './Header';
import CafeActions from '../actions/CafeActions';
import CafeStore from '../stores/CafeStore';
import FetchStore from '../stores/FetchStore';
import FetchActions from '../actions/FetchActions';
import {urlize} from '../filters';
import TopicList from './TopicList';
import TopicsStore from '../stores/TopicsStore';
import TopicsActions from '../actions/TopicsActions';
import UserAvatar from './UserAvatar';

var CafePage = React.createClass({
  mixins: [
    Reflux.connect(CafeStore, "cafe"),
    Reflux.connect(TopicsStore, "topics"),
  ],
  contextTypes: {
    current_user: React.PropTypes.object
  },
  componentDidMount() {
    var slug = this.props.params.slug;
    CafeActions.load(slug, () => {
      TopicsActions.fetchCafeTopics(slug);
    });
  },
  componentWillReceiveProps(nextProps) {
    var newSlug = nextProps.params.slug;
    var oldSlug = this.props.params.slug;
    if ( oldSlug !== newSlug ) {
      this.setState({topics: []});
      FetchActions.fetching(true);
      CafeActions.load(newSlug, () => {
        TopicsActions.fetchCafeTopics(newSlug);
      });
    }
  },
  canWrite() {
    var permission = this.state.cafe.permission || {};
    return permission.write;
  },
  render() {
    var current_user = this.context.current_user;
    var cafe = this.state.cafe;
    return (
      <div className="cafe-view">
        <Header title={cafe.name} description={urlize(cafe.description)} cafe={cafe} path="cafe" />
        <div className="body">
          <div className="split-view container">
            <div className="main-view">
            {
              ((obj) => {
                if (obj.canWrite()) {
                  return (
                    <div className="new-topic">
                      <UserAvatar user={current_user} clazz="small circle"></UserAvatar>
                      <Link to={ "/c/" + cafe.slug + "/create" }>Create a new topic here</Link>
                    </div>
                  );
                }
              })(this)
            }
            <TopicList slug={this.props.params.slug} topics={this.state.topics} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CafePage;
