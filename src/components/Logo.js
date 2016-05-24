import React from 'react';

var Logo = React.createClass({
  render() {
  return (
    <div className={ "logo " + this.props.clazz}>
      <div><span className="left-yellow"></span><span className="right-green"></span></div>
      <div><span className="full-green"></span></div>
      <div><span className="left-green"></span><span className="right-red"></span></div>
    </div>
  );
  }
});

module.exports = Logo;
