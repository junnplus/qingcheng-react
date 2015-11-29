var React = require('react');
var Reflux = require('reflux');
var CafeStore = require('../stores/CafeStore');
var CafeActions = require('../actions/CafeActions');
var TopicForm = require('./TopicForm');

var TopicCreatePage = React.createClass({
    mixins: [
        Reflux.connect(CafeStore, "cafe"),
    ],
    componentDidMount: function(){
        var slug = this.props.params.slug;
        CafeActions.load(slug); 
    },
    render: function() {
        var cafe = this.state.cafe;
        var current_user = this.state.current_user;
        return (
            <div className="fullpage">
                <div className="container">
                    <TopicForm cafe={cafe} current_user={current_user} type="create"/>
                </div>
            </div>
        );
    }
});

module.exports = TopicCreatePage;
