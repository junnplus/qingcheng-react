var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Reflux = require('reflux');
var Header = require('./Header');
var CafeActions = require('../actions/CafeActions');
var CafeStore = require('../stores/CafeStore');
var FetchStore = require('../stores/FetchStore');
var FetchActions = require('../actions/FetchActions');
var urlize = require('../filters').urlize;
var TopicList = require('./TopicList');
var TopicsStore = require('../stores/TopicsStore');
var TopicsActions = require('../actions/TopicsActions');
var UserAvatar = require('./UserAvatar');

var CafePage = React.createClass({
    mixins: [
        Reflux.connect(CafeStore, "cafe"),
        Reflux.connect(TopicsStore, "topics"),
    ],
    componentDidMount: function() {
        var slug = this.props.params.slug;
        CafeActions.load(slug, function(){
            TopicsActions.fetchCafeTopics(slug);
        });
    },
    componentWillReceiveProps: function(nextProps) {
        var newSlug = nextProps.params.slug;
        var oldSlug = this.props.params.slug;
        if ( oldSlug !== newSlug ) {
            this.setState({topics: []});
            FetchActions.fetching(true);
            CafeActions.load(newSlug, function(){
                TopicsActions.fetchCafeTopics(newSlug);
            });
        }
    },
    canWrite: function() {
        var permission = this.state.cafe.permission || {};
        return permission.write;
    },
    render: function() {
        var cafe = this.state.cafe;
        var current_user = this.props.current_user;
        return (
            <div className="cafe-view">
                <Header title={cafe.name} description={urlize(cafe.description)} cafe={cafe} path="cafe" />
                <div className="body">
                    <div className="split-view container">
                        <div className="main-view">
                        {
                            (function(obj){
                                if (obj.canWrite()) {
                                    return (
                                        <div className="new-topic">
                                            <UserAvatar user={current_user} clazz="small circle"></UserAvatar>
                                            <Link to={ "/c/" + cafe.slug + "/create" }>Create a new topic here</Link>
                                        </div>
                                    );
                                }
                            }(this))
                        }
                        <TopicList slug={this.props.params.slug} topics={this.state.topics} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CafePage;
