var React = require('react');
var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var TopicStore = require('../stores/TopicStore');
var TopicForm = require('./TopicForm');

var TopicEditPage = React.createClass({
    mixins: [
        Reflux.connect(TopicStore, "topic"),
    ],
	componentDidMount: function(){
        var tid = this.props.params.tid;
        TopicActions.load(tid);
	},
    render: function() {
		var topic = this.state.topic;
        var cafe = topic.cafes[0];
        var current_user = this.state.current_user;
        return (
            <div className="fullpage">
                {
                    (function(){
                        if (topic.id) {
                            return (
                                <div className="container">
                                    <TopicForm topic={topic} cafe={cafe} current_user={current_user}/>
                                </div>
                            );
                        }
                    }(this))
                }
            </div>
        );
    }
});

module.exports = TopicEditPage;
