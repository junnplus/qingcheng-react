var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var MarkdownStore = require('../stores/MarkdownStore');
var MarkdownActions = require('../actions/MarkdownActions');
var ContentActions = require('../actions/ContentActions');

var MarkdownArea = React.createClass({
    mixins: [
        Reflux.connect(MarkdownStore, "html"),
    ],
    propTypes: {
        value: React.PropTypes.string,
    },
    handleShowPreview: function(e) {
        e.preventDefault();
        if ( this.state.html ) {
            this.setState({html: ''});
        }
        MarkdownActions.preview(this.props.content);
    },
    handleShowEdit: function(e) {
        e.preventDefault();
        this.setState({html: ''});
    },
    handleShowUpload: function(e) {
        e.preventDefault();
        ReactDOM.findDOMNode(this.refs.file).click();
    },
    handleUpload: function() {
        var files = ReactDOM.findDOMNode(this.refs.file).files;
        if ( !files.length ) return;

        ContentActions.uploadImage(files[0]);
    },
    render: function() {
        var current_user = this.props.current_user;
        var displayNone = {
            display: "none"
        };
        return (
            <div className={ "markdown-area " + this.props.clazz }>
                <textarea placeholder={ this.props.placeholder } aria-label={ this.props.placeholder } name="content" value={ this.props.content } style={ !this.state.html ? {} : displayNone} onChange={ this.props.handleChange || this.handleChange }></textarea>
                <div className="markdown-preview" style={ this.state.html ? {} : displayNone} dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
                <div className="markdown-actions" style={ !this.state.html ? {} : displayNone}>
                    <a href="#" onClick={this.handleShowUpload}>Image</a>
                    <a href="#" onClick={this.handleShowPreview}>Preview</a>
                </div>
                <div className="markdown-actions" style={ this.state.html ? {} : displayNone }>
                    <a href="#" onClick={this.handleShowEdit}>Edit</a>
                </div>
                <input type="file" ref="file" style={{ opacity: 0, left: "-99999px", position: "absolute" }} onChange={ this.handleUpload }></input>
            </div>
        );
    }
});

module.exports = MarkdownArea;
