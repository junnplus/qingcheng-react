import React from 'react';

var Webpage = React.createClass({
  render() {
  var webpage = this.props.webpage;
    return (
      <section className="webpage">
        <a href={ webpage.link }>
          <div className="webpage__image"></div>
          <div className="webpage__info">
            <h2>{ webpage.title }</h2>
            <p className="webpage__host">{ webpage.domain }</p>
            <p>{ webpage.description }</p>
          </div>
        </a>
      </section>
    );
  }
});

module.exports = Webpage;
