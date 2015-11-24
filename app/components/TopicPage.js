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
        var comments = this.state.comments;
        return (
			<div className="body">
				<div className="entry-view">
                    {
                        (function(obj){
                            if ( obj.state.fetching ) {
                                return <Logo clazz={ "loading center" } />;
                            } else {
                                return <TopicHentry topic={ topic } />;
                            }
                        }(this))
                    }
				</div>
                { 
                    (function(obj){
                        if (topic.id) {
                            return <CommentBox comments={comments} topic={topic} current_user={current_user} />;
                        }
                    }(this)) 
                }
			</div>
        );
    }
});

module.exports = TopicPage;
