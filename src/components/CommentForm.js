import React from 'react';
import Reflux from 'reflux';
import ReactDOM from 'react-dom';
import MarkdownArea from './MarkdownArea';
import UserAvatar from './UserAvatar';
import ShowOverlayActions from '../actions/ShowOverlayActions';
import CommentsActions from '../actions/CommentsActions';
import ContentActions from '../actions/ContentActions';
import ContentStore from '../stores/ContentStore';
import shake from '../utils';

var CommentForm = React.createClass({
  mixins: [
    Reflux.connect(ContentStore, "content"),
  ],
  contextTypes: {
    current_user: React.PropTypes.object
  },
  handleShowLogin() {
    ShowOverlayActions.showLogin(true);
  },
  handleChange(e) {
    ContentActions.sync(e.target.value);
    this.setState({content: e.target.value});
  },
  handleFormSubmit(e) {
    e.preventDefault();
    var content = this.state.content.replace(/(^\s*)|(\s*$)/g, "");
    if ( !content || 480 - content.length < 0 ) {
      return shake(ReactDOM.findDOMNode(this.refs.form));
    }
    var payload = {content: content};
    CommentsActions.createTopicComment(this.props.topic.id, payload, () => {
      this.setState({content: ''});
    });
  },
  render() {
    var current_user = this.context.current_user;
    return (
      <form className="comment-form" ref="form" onSubmit={ this.handleFormSubmit }>
        {
          ((obj) => {
            if ( !current_user.id ) {
              return <div className="comment-form-mask" onClick={obj.handleShowLogin}></div>;
            }
          })(this)
        }
        {
          ((obj) => {
            if ( current_user.id ) {
              return <UserAvatar user={ current_user } clazz="small circle" />;
            }
          })(this)
        }
        <MarkdownArea clazz="comment-item" placeholder="Write your response" content={ this.state.content } handleChange={ this.handleChange }></MarkdownArea>
        {
          ((obj) => {
            if ( current_user.id ) {
              return <button className="button">Reply</button>;
            }
          })(this)
        }
      </form>
    );
  }
});

module.exports = CommentForm;
