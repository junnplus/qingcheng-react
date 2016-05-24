import React from 'react';
import {ReactRouter, Link} from 'react-router';

var HeaderNav = React.createClass({
  render() {
    var path = this.props.path;
    if ( path === 'home' ) {
      return (
        <nav className="header__nav nav">
          <Link to="/" className="nav__item" activeClassName="v-link-active">Following</Link>
          <Link to="/" query={{show: "all"}} className="nav__item" activeClassName="v-link-active">Topics</Link>
          <Link to="/c/" className="nav__item" activeClassName="v-link-active">Cafes</Link>
        </nav>
      );
    } else if ( path === 'cafe' ) {
      var cafe = this.props.cafe;
      return (
        <nav className="header__nav nav">
          <Link to={ "/c/" + cafe.slug } className="nav__item" activeClassName="v-link-active">Topics</Link>
          <Link to={ "/c/" + cafe.slug + "/members" } className="nav__item" activeClassName="v-link-active">Members</Link>
        </nav>
      );
    } else if ( path === 'user' ) {
      var user = this.props.user;
      return (
        <nav className="header__nav nav">
          <Link to={ "/u/" + user.username } className="nav__item" activeClassName="v-link-active">Topics</Link>
        </nav>
      );
    }
  }
});

module.exports = HeaderNav;
