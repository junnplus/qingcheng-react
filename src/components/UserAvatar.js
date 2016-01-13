import React from 'react';
import {ReactRouter, Link} from 'react-router';

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
    render() {
        var user = this.props.user;
        var clazz = this.props.clazz ? this.props.clazz : "";
        return (
            <Link to={ "/u/" + user.username } className={ clazz + " avatar" } aria-label={"View @" + user.username + " profile"} onClick={this.props.onClick}><img src={ user.avatar_url }></img></Link>
        );
    }
});

module.exports = UserAvatar;
