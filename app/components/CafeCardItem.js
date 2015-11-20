var React = require('react');

var CafeCardItem = React.createClass({
    propTypes: {
        cafe: React.PropTypes.shape({
            slug: React.PropTypes.string.isRequired,
            description: React.PropTypes.string.isRequired
        }).isRequired,
    },
    getDefaultProps: function() {
        return {
            cafe: {
                slug: null,
                description: null
            },
        };
    },
    render: function() {
		var cafe = this.props.cafe;
        return (
			<div id={ "c-" + cafe.slug } className="cafe-card card">
				<a className="cover" href={ "/c/" + cafe.slug }>
					<div className="cover__text">
						<h3 className="card-title">{ cafe.slug }</h3>
					</div>
				</a>
				<div className="card-footer">
					<div className="card-description">{ cafe.description }</div>
				</div>
			</div>
        );
    }
});

module.exports = CafeCardItem;
