var React = require('react');
var Reflux = require('reflux');
var TopicHentry = require('./TopicHentry');
var FetchStore = require('../stores/FetchStore');
var TopicActions = require('../actions/TopicActions');
var TopicStore = require('../stores/TopicStore');
var CommentsStore = require('../stores/CommentsStore');
var CommentsActions = require('../actions/CommentsActions');
var Logo = require('./Logo');
var CommentBox = require('./CommentBox');

var TopicPage = React.createClass({
    mixins: [
        Reflux.connect(TopicStore, "topic"),
        Reflux.connect(FetchStore, "fetching"),
        Reflux.connect(CommentsStore, "comments")
    ],
	componentDidMount: function(){
        var tid = this.props.params.tid;
        TopicActions.load(tid);
        CommentsActions.fetchTopicComments(tid);
	},
    render: function() {
		var topic = this.state.topic;
        var current_user = this.props.current_user;
        var logo, topicHentry;
        if ( this.state.fetching ) {
            logo = <Logo clazz={ "loading center" } />;
        } else {
            topicHentry = <TopicHentry topic={ topic } />;
        }
		var commentBox;
		if (topic.id) {
            commentBox = <CommentBox comments={this.state.comments} topic={topic} current_user={current_user} />;
		}
        return (
			<div className="body">
				<div className="entry-view">
                    { topicHentry } 
                    { logo }
				</div>
                { commentBox }
			</div>
        );
    }
});

module.exports = TopicPage;
