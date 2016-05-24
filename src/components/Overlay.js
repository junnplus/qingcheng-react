import React from 'react';
import ShowOverlayActions from '../actions/ShowOverlayActions';

var Overlay = React.createClass({
  componentDidMount() {
    document.body.className = 'no-scroll';
  },
  componentWillUnmount() {
    document.body.className = '';
  },
  handleHiddenLogin() {
    ShowOverlayActions.showLogin(false);
  },
  render() {
    return (
      <div className="overlay">
        <div className="overlay-mask" onClick={this.handleHiddenLogin}></div>
        <div className="overlay-inner">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Overlay;
