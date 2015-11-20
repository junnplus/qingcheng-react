var React = require('react');

var LikeButton = React.createClass({
    render: function() {
        return (
			<button className="button button--white like-button">
				<i className="qc-icon-heart"></i>
				<span>Like it</span>
			</button>
        );
    }
});

module.exports = LikeButton;
