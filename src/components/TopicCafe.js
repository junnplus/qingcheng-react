import React from 'react';
import {ReactRouter, Link} from 'react-router';
import {logo} from '../filters';

var TopicCafe = React.createClass({
  propTypes: {
    cafe: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      slug: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired
    }).isRequired,
  },
  getDefaultProps() {
    return {
      cafe: {
        name: null,
        slug: null,
        description: null
      },
    };
  },
  render() {
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
