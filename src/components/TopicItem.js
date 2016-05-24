import React from 'react';
import {ReactRouter, Link} from 'react-router';
import UserAvatar from './UserAvatar';
import TopicCafe from './TopicCafe';
import {timeago} from '../filters';

var TopicItem = React.createClass({
  propTypes: {
    topic: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired
    }).isRequired,
  },
  getDefaultProps() {
    return {
      topic: {
        id: null,
        title: null
      }
    };
  },
  render() {
    var topic = this.props.topic;
    var cafes;
    if (topic.cafes) {
      cafes = this.props.topic.cafes.map((item) => {
        return <TopicCafe key={item.id} cafe={item} />;
      });
    }
    var viewCount, likeCount, commentCount;
    if ( topic.view_count ) {
      viewCount = <span>{ topic.view_count + " views" }</span>;
    }
    if ( topic.like_count ) {
      likeCount = <span>{ topic.like_count + " likes" }</span>;
    }
    if ( topic.comment_count ) {
      commentCount = <span>{ topic.comment_count + " replies" }</span>;
    }
    return (
      <li id={ "t-" + topic.id } className="topic-item clearfix">
        <span className="user-avatar">
          <UserAvatar user={ topic.user } clazz={ "small circle tip" } />
        </span>
        <div className="topic-meta">
          { cafes }
        </div>
        <Link to={ "/t/" + topic.id } className="topic-title"> { topic.title } </Link>
        <div className="topic-info">
          <time>{ timeago(topic.created_at) }</time>
          { viewCount }
          { likeCount }
          { commentCount }
        </div>
      </li>
    );
  }
});

module.exports = TopicItem;
