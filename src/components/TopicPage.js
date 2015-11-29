var React = require('react');
var Reflux = require('reflux');
var TopicHentry = require('./TopicHentry');
var FetchStore = require('../stores/FetchStore');
var FetchActions = require('../actions/FetchActions');
var TopicActions = require('../actions/TopicActions');
var TopicStore = require('../stores/TopicStore');
var CommentsStore = require('../stores/CommentsStore');
var Logo = require('./Logo');
var CommentBox = require('./CommentBox');
var CommentsActions = require('../actions/CommentsActions');

var TopicPage = React.createClass({
    mixins: [
        Reflux.connect(TopicStore, "topic"),
        Reflux.connect(FetchStore, "fetching"),
        Reflux.connect(CommentsStore, "comments")
    ],
    componentDidMount: function(){
        var tid = this.props.params.tid;
        TopicActions.load(tid, function(){
            CommentsActions.fetchTopicComments(tid);
        });
    },
    componentWillReceiveProps: function(nextProps) {
        var newId = nextProps.params.tid;
        var oldId = this.props.params.tid;
        if ( oldId !== newId ) {
            this.setState({comments: []});
            FetchActions.fetching(true);
            TopicActions.load(newId, function(){
                CommentsActions.fetchTopicComments(newId);
            });
        }
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
                            } else if ( topic.id ) {
                                return <TopicHentry topic={ topic } current_user={ current_user }/>;
                            }
                        }(this))
                    }
                </div>
                { 
                    (function(obj){
                        if ( !obj.state.fetching && topic.id) {
                            return <CommentBox comments={comments} topic={topic} current_user={current_user} />;
                        }
                    }(this)) 
                }
            </div>
        );
    }
});

module.exports = TopicPage;
