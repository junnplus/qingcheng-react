import React from 'react';
import ReactDOM from 'react-dom';
import {ReactRouter, Link} from 'react-router';
import wordColor from 'word-color';

var UserAvatar = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      username: React.PropTypes.string.isRequired,
      avatar_url: React.PropTypes.string
    }).isRequired,
  },
  getDefaultProps() {
    return {
      user: {
        username: null,
        avatar_url: null
      },
    };
  },
  componentDidMount() {
    this.showAvatar();
  },
  showAvatar() {
    var user = this.props.user;
    if (!user.username) return;
    var span = '<span style="background-color:#1;color:#2">#3<\/span>';
    var bg = wordColor.rgb(user.username);
    var fg = 'white';
    if ((bg[0] * 299 + bg[1] * 587 + bg[2] * 114) > 200000) {
      fg = 'black';
    }

    span = span
      .replace('#1', 'rgb(' + bg.join(',') + ')')
      .replace('#2', fg)
      .replace('#3', escape(user.username.charAt(0).toUpperCase()));
    var el = ReactDOM.findDOMNode(this.refs.avatar);
    el.innerHTML = span;
    if (!user.avatar_url) return;
    var key = 'avatar:' + user.avatar_url;

    var img = new Image();
    img.src = user.avatar_url;
    img.alt = user.username;
    img.onload = function() {
      el.innerHTML = '';
      el.appendChild(img);
    };
    img.onerror = function() {
      sessionStorage[key] = '1';
    };
  },
  render() {
    var user = this.props.user;
    var clazz = this.props.clazz ? this.props.clazz : "";
    return (
      <Link to={ "/u/" + user.username } className={ clazz + " avatar" } aria-label={"View @" + user.username + " profile"} ref='avatar' onClick={ this.props.onClick }></Link>
    );
  }
});

module.exports = UserAvatar;
