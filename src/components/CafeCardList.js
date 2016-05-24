import React from 'react';
import CafeCardItem from './CafeCardItem';
import Logo from './Logo';

var CafeCardList = React.createClass({
  propTypes: {
    cafes: React.PropTypes.array.isRequired,
  },
  getDefaultProps() {
    return {
      cafes: []
    };
  },
  render() {
    var cafes = this.props.cafes.map((item) => {
      return <CafeCardItem key={item.id} cafe={item} />;
    });
    return (
      <div className="cafe-cards clearfix">
        { cafes }
      </div>
    );
  }
});

module.exports = CafeCardList;
