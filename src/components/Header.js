import React from 'react';
import HeaderNav from './HeaderNav';
import UserAvatar from './UserAvatar';

var Header = React.createClass({
  style() {
    var style = this.props.cafe.style;
    if (!style || !style.cover) return {};
    return {'backgroundImage': 'url(' + style.cover + ')'};
  },
  render() {
    return (
      <div className="header">
        <div className="header__cover cover" style={ this.props.cafe ? this.style() : {}}>
          <div className="cover__text">
            <div className="container">
              <h2>{this.props.title}</h2><p dangerouslySetInnerHTML={{ __html: this.props.description }}></p>
            </div>
          </div>
        </div>
        <div className="header__bottom">
          <div className="container">
            <HeaderNav cafe={ this.props.cafe ? this.props.cafe : {} } user={ this.props.user ? this.props.user : {} } path={this.props.path} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
