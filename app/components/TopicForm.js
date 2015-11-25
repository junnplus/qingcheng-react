var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Reflux = require('reflux');
var TopicActions = require('../actions/TopicActions');
var TopicStore = require('../stores/TopicStore');
var MarkdownArea = require('./MarkdownArea');

var TopicForm = React.createClass({
    getInitialState: function() {
        return {
            title: this.props.topic.title || '',
            link: this.props.topic.link || '',
            content: this.props.topic.content || '',
            disabled: false 
        };
    },
    propTypes: {
        topic: React.PropTypes.shape({
            title: React.PropTypes.string,
            link: React.PropTypes.string,
            content: React.PropTypes.string
        }),
    },
	getDefaultProps: function() {
		return {
		    topic: {
                title: '',
                link: '',
                content: ''
            }
		};
	},
    handleChange: function(e) {
        var newState = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    },
    handleFormSubmit: function() {
    },
    render: function() {
        var cafe = this.props.cafe;
        var current_user = this.props.current_user;
        return (
			<form className="topic-form">
				<div className="form-description">
					Topic in <Link to={ "/c/" + cafe.slug }> { cafe.name }</Link>
				</div>
				<div className="form-field form-title">
					<input placeholder="Your topic title" name='title' value={this.state.title} onChange={ this.handleChange }></input>
				</div>
				<div className="form-field form-link">
					<input placeholder="Source link?" type="url" name='link' value={this.state.link} onChange={ this.handleChange }></input>
				</div>
				<MarkdownArea clazz="form-field form-content yue" handleChange={this.handleChange} placeholder="What is in your mind" content={ this.state.content }></MarkdownArea>
				<div className="form-submit">
					<button className="button buttong--green" onSubmit={ this.handleFormSubmit }>{ this.props.type }</button>
				</div>
			</form>
        );
    }
});

module.exports = TopicForm;
