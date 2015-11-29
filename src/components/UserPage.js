var React = require('react');
var Reflux = require('reflux');
var Header = require('./Header');
var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');
var TopicList = require('./TopicList');
var TopicsActions = require('../actions/TopicsActions');
var TopicsStore = require('../stores/TopicsStore');
var urlize = require('../filters').urlize;

var UserPage = React.createClass({
    mixins: [
        Reflux.connect(UserStore, "user"),
        Reflux.connect(TopicsStore, "topics"),
    ],
    componentDidMount: function() {
        var username = this.props.params.username;
		UserActions.fetchUser(username);
        TopicsActions.fetchUserTopics(username);
    },
    render: function() {
        var user = this.state.user;
        return (
            <div className="user-view">
                <Header title={user.username} description={urlize(user.description)} path="user" user={user}/>
                <div className="body">
                    <div className="split-view container">
                        <div className="main-view">
                            <TopicList topics={this.state.topics} user={user} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = UserPage;
