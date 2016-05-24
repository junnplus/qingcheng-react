import React from 'react';

var ShareButton = React.createClass({
  render() {
    return (
      <span className="share-buttons">
        <button className="button button--white tip" aria-label="Share to Weibo">
          <i className="qc-icon-weibo"></i>
        </button>
        <button className="button button--white tip" aria-label="Share to Twitter">
          <i className="qc-icon-twitter"></i>
        </button>
      </span>
    );
  }
});

module.exports = ShareButton;
