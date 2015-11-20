var React = require('react');
var CafeCardItem = require('./CafeCardItem');
var Logo = require('./Logo');

var CafeCardList = React.createClass({
    propTypes: {
        cafes: React.PropTypes.array.isRequired,
    },
    getDefaultProps: function() {
        return {
            cafes: []
        };
    },
    render: function() {
        var cafes = this.props.cafes.map(function(item){
            return <CafeCardItem key={item.id} cafe={item} />;
        }.bind(this));
        return (
            <div className="cafe-cards clearfix">
                { cafes }
            </div>
        );
    }
});

module.exports = CafeCardList;
