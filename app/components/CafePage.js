var React = require('react');
var Reflux = require('reflux');
var Header = require('./Header');
var CafeActions = require('../actions/CafeActions');
var CafeStore = require('../stores/CafeStore');
var FetchStore = require('../stores/FetchStore');
var FetchActions = require('../actions/FetchActions');
var urlize = require('../filters').urlize;
var TopicList = require('./TopicList');
var TopicsStore = require('../stores/TopicsStore');

var CafePage = React.createClass({
    mixins: [
        Reflux.connect(CafeStore, "cafe"),
        Reflux.connect(TopicsStore, "topics"),
    ],
    componentDidMount: function() {
        var slug = this.props.params.slug;
		CafeActions.load(slug);
    },
    componentWillReceiveProps: function(nextProps) {
        var newSlug = nextProps.params.slug;
        var oldSlug = this.props.params.slug;
        if ( oldSlug !== newSlug ) {
            this.setState({topics: []});
            FetchActions.fetching(true);
            CafeActions.load(newSlug);
        }
    },
    render: function() {
        var cafe = this.state.cafe;
        return (
            <div className="cafe-view">
                <Header title={cafe.name} description={urlize(cafe.description)} cafe={cafe} path="cafe" />
                <div className="body">
					<div className="split-view container">
					  <div className="main-view">
						<TopicList slug={this.props.params.slug} topics={this.state.topics} />
					  </div>
					</div>
                </div>
            </div>
        );
    }
});

module.exports = CafePage;
