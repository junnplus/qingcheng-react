var React = require('react');
var ShowLoginActions = require('../actions/ShowLoginActions');

var Overlay = React.createClass({
    componentDidMount: function() {
        document.body.className = 'no-scroll';
    },
    componentWillUnmount: function() {
        document.body.className = '';
    },
    handleHiddenLogin: function() {
        ShowLoginActions.showLogin(false);
    },
    render: function() {
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
