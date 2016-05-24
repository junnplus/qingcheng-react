import React from 'react';
import Reflux from 'reflux';
import CafeStore from '../stores/CafeStore';
import CafeActions from '../actions/CafeActions';
import TopicForm from './TopicForm';

var TopicCreatePage = React.createClass({
  mixins: [
    Reflux.connect(CafeStore, "cafe"),
  ],
  componentDidMount(){
    var slug = this.props.params.slug;
    CafeActions.load(slug);
  },
  render() {
    var cafe = this.state.cafe;
    var current_user = this.state.current_user;
    return (
      <div className="fullpage">
        <div className="container">
          <TopicForm cafe={cafe} current_user={current_user} type="create"/>
        </div>
      </div>
    );
  }
});

module.exports = TopicCreatePage;
