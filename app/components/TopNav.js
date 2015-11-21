var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Logo = require('./Logo');
var ShowLoginActions = require('../actions/ShowLoginActions');

var TopNav = React.createClass({
    handleShowLogin: function() {
        ShowLoginActions.showLogin(true);
    },
    render: function() {
        return (
            <div className="top-nav">
                <div className="container">
                    <div className="site-nav clearfix">
                        <a className="site-logo v-link-active" href="/">
                            <Logo />
                        </a>
                        <nav>
                            <Link to="/c/about"> About </Link>
                        </nav>
                    </div>
                    <div className="site-account">
                        <div className="nav">
                            <button className="button" onClick={this.handleShowLogin}>Log in</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TopNav;
