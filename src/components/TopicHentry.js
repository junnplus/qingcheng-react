var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Webpage = require('./Webpage');
var LikeButton = require('./LikeButton');
var ShareButton = require('./ShareButton');
var UserAvatar = require('./UserAvatar');
var Dropdown = require('./Dropdown');
var timeago = require('../filters').timeago;
var urlize = require('../filters').urlize;

var TopicHentry = React.createClass({
  propTypes: {
    topic: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      cafes: React.PropTypes.array.isRequired
    }).isRequired,
  },
  contextTypes: {
    current_user: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      topic: {
        title: '',
        cafes: []
      }
    };
  },
  getInitialState() {
    return {
      showEditDropdown: false
    };
  },
  topicStyle() {
    var cover = this.props.topic.info.cover;
    if (!cover) return null;
    return {'backgroundImage': 'url(' + cover + ')'};
  },
  cafeStyle() {
    var style = this.props.topic.cafes[0].style;
    var rv = {'backgroundColor': style.color || '#222221'};
    if (style.logo) {
      rv.backgroundImage = 'url(' + style.logo + ')';
    }
    return rv;
  },
  handleShowEditDropdown() {
    this.setState({showEditDropdown: true});
  },
  handleClose() {
    this.setState({showEditDropdown: false});
  },
  render() {
    var current_user = this.context.current_user;
    var topic = this.props.topic;
    var user = this.props.topic.user;
    var cafe = this.props.topic.cafes[0];
    return (
      <div className="hentry">

        <div className="container">
          <h2 className="entry-title">{ topic.title }</h2>
          <div className="entry-meta">
            <Link to={ "/c/" + cafe.slug } aria-label={ "Published in " + cafe.name }>
              <span className="cafe-logo" style={ this.cafeStyle() }></span>
            </Link>
            <time title={ "Updated at " + topic.updated_at }>{ timeago(topic.created_at) }</time>
            <Link to={ "/u/" + user.username } aria-label={ "Published by " + user.username }>@{ user.username }</Link>
          </div>
          {
            ((obj) => {
              if (topic.webpage) {
                return <Webpage webpage={ topic.webpage } />;
              }
            })(this)
          }
          <div className="entry-content yue" dangerouslySetInnerHTML={{ __html: topic.content }}></div>
          <div className="entry-actions clearfix">
            <LikeButton current_user={current_user} topic={topic}/>
            <div className="more-actions">
              <ShareButton />
              {
                ((obj) => {
                  if( current_user.username && topic.user.id === current_user.id ) {
                    return (
                      <span>
                        <button className="button button--white tip" aria-label="Show edit options" onClick={obj.handleShowEditDropdown}>
                          <i className="qc-icon-quill"></i>
                        </button>
                        {
                          ((_obj) => {
                            if ( _obj.state.showEditDropdown ) {
                              return (
                                <Dropdown handleClose={_obj.handleClose}>
                                  <Link to={ "/t/" + topic.id + "/edit" } className="dropdown-item">Edit</Link>
                                  <a className="dropdown-item" href="/account/delete-topic/{{topic.id}}">Delete</a>
                                </Dropdown>
                              );
                            }
                          })(obj)
                        }
                      </span>
                    );
                  }
                })(this)
              }
            </div>
          </div>

          <div className="entry-footer clearfix">
            <div className="topic-cafe column">
              <div className="column-title">Published In</div>
              <a href={ "/c/" + cafe.slug } className="column-header">
                <span className="cafe-logo" style={ this.cafeStyle() }></span>
                <div className="column-main">
                  <strong>{ cafe.name }</strong>
                </div>
              </a>
              <p>{ urlize(cafe.description) }</p>
            </div>

            <div className="topic-author column">
              <div className="column-title">Created By</div>
              <div className="column-header">
                <UserAvatar user={user} />
                <a className="column-main" href={ "/u/" + user.username }>
                <strong>{ user.username }</strong>
                <div>#{ user.id }</div>
                </a>
              </div>
              <p>{ user.description }</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TopicHentry;
