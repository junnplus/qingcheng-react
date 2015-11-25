var React = require('react');
var Reflux = require('reflux');
var MarkdownStore = require('../stores/MarkdownStore');
var MarkdownActions = require('../actions/MarkdownActions');

var MarkdownArea = React.createClass({
    mixins: [
        Reflux.connect(MarkdownStore, "html"),
    ],
    getInitialState: function() {
        return {
            content: '',
        };
    },
    handleShowPreview: function(e) {
        e.preventDefault();
        if ( this.state.html ) {
            this.setState({html: ''});
        }
        MarkdownActions.preview(this.state.content);
    },
    handleShowEdit: function(e) {
        e.preventDefault();
        this.setState({html: ''});
    },
    handleChange: function(e) {
        this.setState({content: e.target.value});
    },
    render: function() {
        var current_user = this.props.current_user;
        var displayNone = {
            display: "none"
        };
        return (
			<div className={ "markdown-area " + this.props.clazz }>
				<textarea placeholder={ this.props.placeholder } aria-label={ this.props.placeholder } style={ !this.state.html ? {} : displayNone} onChange={this.handleChange}></textarea>
				<div className="markdown-preview" style={ this.state.html ? {} : displayNone} dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
				<div className="markdown-actions" style={ !this.state.html ? {} : displayNone}>
					<a>Image</a>
					<a href="#" onClick={this.handleShowPreview}>Preview</a>
				</div>
				<div className="markdown-actions" style={ this.state.html ? {} : displayNone }>
					<a href="#" onClick={this.handleShowEdit}>Edit</a>
				</div>
				<input type="file" style={{ opacity: 0, left: "-99999px", position: "absolute" }}></input>
			</div>
        );
    }
});

module.exports = MarkdownArea;
