var React = require('react');
var urlize = require('../filters').urlize;
var UserAvatar = require('./UserAvatar');

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
    color: function() {
        var style = this.props.cafe.style;
        var rv = {};
        if (style.color) {
          	rv.backgroundColor = style.color;
        }
        if (style.cover) {
          	rv.backgroundImage = 'url(' + style.cover + ')';
        }
        return rv;
    },
    render: function() {
		var cafe = this.props.cafe;
        return (
			<div id={ "c-" + cafe.slug } className="cafe-card card">
				<a className="cover" style={ this.color() } href={ "/c/" + cafe.slug }>
					<div className="cover__text">
						<h3 className="card-title">{ cafe.name }</h3>
					</div>
				</a>
                {
                    (function(obj){
                        if ( cafe.user ) {
                            return <UserAvatar user={ cafe.user }  clazz="small circle" />;
                        }
                    }(this))
                }
				<div className="card-footer">
					<div className="card-description">{ cafe.description ? urlize(cafe.description) : "No description" }</div>
				</div>
			</div>
        );
    }
});

module.exports = CafeCardItem;
