var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var TopicStore = require('../stores/TopicStore');
var MarkdownArea = require('./MarkdownArea');

var TopicForm = React.createClass({
    render: function() {
		var topic = this.props.topic || {};
        var cafe = this.props.cafe;
        var current_user = this.props.current_user;
        return (
			<form className="topic-form">
				<div className="form-description">
					Topic in <Link to={ "/c/" + cafe.slug }> { cafe.name }</Link>
				</div>
				<div className="form-field form-title">
					<input placeholder="Your topic title"></input>
				</div>
				<div className="form-field form-link">
					<input placeholder="Source link?" type="url"></input>
				</div>
				<MarkdownArea clazz="form-field form-content yue" placeholder="What is in your mind"></MarkdownArea>
				<div className="form-submit">
					<button className="button buttong--green"></button>
				</div>
			</form>
        );
    }
});

module.exports = TopicForm;
