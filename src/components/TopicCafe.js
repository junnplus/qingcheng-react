var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var logo = require('../filters').logo;

var TopicCafe = React.createClass({
    propTypes: {
        cafe: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            slug: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired
        }).isRequired,
    },
    getDefaultProps: function() {
        return {
            cafe: {
                name: null,
                slug: null,
                description: null
            },
        };
    },
    render: function() {
        var cafe = this.props.cafe;
        return (
            <span className="topic-cafe">
                <span className="cafe-logo" style={ logo(cafe.style) }></span>
                <Link to={ '/c/' + cafe.slug } aria-label={ "Published in " + cafe.name }>{ cafe.name }</Link>
            </span>
        );
    }
});

module.exports = TopicCafe;
