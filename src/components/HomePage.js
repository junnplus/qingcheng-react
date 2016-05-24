import React from 'react';
import Reflux from 'reflux';
import Header from './Header';
import TopicList from './TopicList';
import FetchStore from '../stores/FetchStore';
import FetchActions from '../actions/FetchActions';
import TimelineActions from '../actions/TimelineActions';
import TimelineStore from '../stores/TimelineStore';

var HomePage = React.createClass({
  mixins: [
    Reflux.connect(FetchStore, "fetching"),
    Reflux.connect(TimelineStore, "topics")
  ],
  componentDidMount(){
    TimelineActions.fetchTimeline(this.props.location.query);
  },
  componentWillReceiveProps(nextProps) {
    if ( nextProps.location.search !== this.props.location.search ) {
      this.setState({topics: []});
      FetchActions.fetching(true);
      TimelineActions.resetTimeline();
      TimelineActions.fetchTimeline(nextProps.location.query);
    }
  },
  render() {
    var current_user = this.context.current_user;
    return (
      <div className="home-view">
        <Header title="Python China" description="Welcome to Python China" path="home" />
        <div className="body">
          <div className="split-view container">
            <div className="main-view">
              <TopicList topics={this.state.topics} query={this.props.location.query} />
            </div>
            <div className="sidebar-view">
              {
                ((obj) => {
                  if ( current_user && current_user.id ) {
                    return (
                      <div className="widget">
                        <a className="button button--green">New Topic</a>
                      </div>
                    );
                  }
                })(this)
              }
              <div className="site-sidebar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
