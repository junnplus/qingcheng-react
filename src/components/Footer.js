import React from 'react';

var Footer = React.createClass({
  getDefaultProps() {
    return {
      year: new Date().getFullYear()
    };
  },
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div style={{float: "left"}}>Copyright &copy; { this.props.year } Python China </div>
          <div style={{float: "right"}}>
            <a href="https://github.com/lepture/zerqu">ZERQU</a> •
            <a href="https://github.com/zerqu/qingcheng">青城</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Footer;
