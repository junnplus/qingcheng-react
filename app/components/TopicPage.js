var React = require('react');
var Reflux = require('reflux');
var TopicHentry = require('./TopicHentry');
var FetchStore = require('../stores/FetchStore');
var TopicActions = require('../actions/TopicActions');
var TopicStore = require('../stores/TopicStore');
var Logo = require('./Logo');
var $ = require('jquery');

var TopicPage = React.createClass({
    mixins: [
        Reflux.connect(TopicStore, "topic"),
        Reflux.connect(FetchStore, "fetching")
    ],
	componentDidMount: function(){
        var tid = this.props.params.tid;
        TopicActions.load(tid);
	},
    render: function() {
		var topic = this.state.topic;
        var logo, topicHentry;
        if ( this.state.fetching ) {
            logo = <Logo clazz={ "loading center" } />;
        } else {
            topicHentry = <TopicHentry topic={ topic } />;
        }
        return (
			<div className="body">
				<div className="entry-view">
                    { topicHentry } 
                    { logo }
				</div>
			</div>
        );
    }
});

module.exports = TopicPage;
