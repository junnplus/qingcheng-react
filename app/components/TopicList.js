var React = require('react');
var Reflux = require('reflux');
var TopicItem = require('./TopicItem');
var Logo = require('./Logo');
var FetchStore = require('../stores/FetchStore');
var FetchActions = require('../actions/FetchActions');
var TopicsActions = require('../actions/TopicsActions');
var TimelineActions = require('../actions/TimelineActions');

var TopicList = React.createClass({
    mixins: [
        Reflux.connect(FetchStore, "fetching")
    ],
    propTypes: {
        topics: React.PropTypes.array.isRequired,
    },
    getDefaultProps: function() {
        return {
            topics: []
        };
    },
    fetchMoreTopics: function(cursor) {
        FetchActions.fetching(true);
        if (this.props.user) {
            TopicsActions.fetchTopics(this.props.user.username);
        } else {
            TimelineActions.fetchTimeline(this.props.query);
        }
    },
    render: function() {
        var topics = this.props.topics.map(function(item, index){
            return <TopicItem key={index} topic={item} />;
        }.bind(this));
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
