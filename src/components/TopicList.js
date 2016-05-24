import React from 'react';
import Reflux from 'reflux';
import TopicItem from './TopicItem';
import Logo from './Logo';
import FetchStore from '../stores/FetchStore';
import FetchActions from '../actions/FetchActions';
import TopicsActions from '../actions/TopicsActions';
import TimelineActions from '../actions/TimelineActions';

var TopicList = React.createClass({
  mixins: [
    Reflux.connect(FetchStore, "fetching")
  ],
  propTypes: {
    topics: React.PropTypes.array.isRequired,
  },
  getDefaultProps() {
    return {
      topics: []
    };
  },
  fetchMoreTopics(cursor) {
    FetchActions.fetching(true);
    if (this.props.user) {
      TopicsActions.fetchTopics(this.props.user.username);
    } else {
      TimelineActions.fetchTimeline(this.props.query);
    }
  },
  render() {
    var topics = this.props.topics.map((item, index) => {
      return <TopicItem key={index} topic={item} />;
    });
    var logo, loadMore;
    if ( this.state.fetching ) {
      logo = <Logo clazz={ "loading center" } />;
    } else if ( !this.props.slug ){
      loadMore = <div className="load-more" onClick={ this.fetchMoreTopics }>Load More</div>;
    }
    return (
      <div className="topic-list">
        <ul> { topics } </ul>
        { logo }
        { loadMore }
      </div>
    );
  }
});

module.exports = TopicList;
