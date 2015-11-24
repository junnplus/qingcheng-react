var React = require('react');

var MarkdownArea = React.createClass({
    render: function() {
        var current_user = this.props.current_user;
        return (
			<div className="markdown-area">
				<textarea placeholder={ this.props.placeholder } aria-label={ this.props.placeholder }></textarea>
				<div className="markdown-preview"></div>
				<div className="markdown-actions">
					<a>Image</a>
					<a>Preview</a>
				</div>
				<div className="markdown-actions">
					<a>Edit</a>
				</div>
				<input type="file" style={{ opacity: 0, left: "-99999px", position: "absolute" }}></input>
			</div>
        );
    }
});

module.exports = MarkdownArea;
