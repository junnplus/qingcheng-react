import React from 'react';

var Dropdown = React.createClass({
  render() {
    return (
      <div className="dropdown">
        <div className="dropdown-mask" onClick={ this.props.handleClose }></div>
        <div className="dropdown-inner" onClick={ this.props.handleChoose }>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Dropdown;
