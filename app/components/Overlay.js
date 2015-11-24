var React = require('react');
var ShowOverlayActions = require('../actions/ShowOverlayActions');

var Overlay = React.createClass({
    componentDidMount: function() {
        document.body.className = 'no-scroll';
    },
    componentWillUnmount: function() {
        document.body.className = '';
    },
    handleHiddenLogin: function() {
        ShowOverlayActions.showLogin(false);
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
