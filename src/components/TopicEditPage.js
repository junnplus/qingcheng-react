import React from 'react';
import Reflux from 'reflux';
import TopicActions from '../actions/TopicActions';
import TopicStore from '../stores/TopicStore';
import TopicForm from './TopicForm';

var TopicEditPage = React.createClass({
  mixins: [
    Reflux.connect(TopicStore, "topic"),
  ],
  componentDidMount(){
    var tid = this.props.params.tid;
    TopicActions.viewRaw(tid);
  },
  render() {
  var topic = this.state.topic;
    var cafe = topic.cafes[0];
    var current_user = this.state.current_user;
    return (
      <div className="fullpage">
        {
          (() => {
            if (topic.id) {
              return (
                <div className="container">
                  <TopicForm topic={topic} cafe={cafe} current_user={current_user} type="update" />
                </div>
              );
            }
          })(this)
        }
      </div>
    );
  }
});

module.exports = TopicEditPage;
