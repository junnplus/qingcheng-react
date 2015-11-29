var React = require('react');
var HeaderNav = require('./HeaderNav');
var UserAvatar = require('./UserAvatar');

var Header = React.createClass({
    style: function() {
        var style = this.props.cafe.style;
        if (!style || !style.cover) return {};
        return {'backgroundImage': 'url(' + style.cover + ')'};
    },
    render: function() {
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
