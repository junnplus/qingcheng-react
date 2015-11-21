var React = require('react');
var ReactDOM = require('react-dom');

var LoginForm = React.createClass({
    getInitialState: function() {
        return {
            LoginTab: true
        };
    },
    handleShowLoginTab: function() {
        this.setState({LoginTab: true});
    },
    handleShowSignupTab: function() {
        this.setState({LoginTab: false});
    },
    render: function() {
        return (
			<div className="login-form">
				<div className="login-tab clearfix">
					<a className={this.state.LoginTab ? "active": ""} onClick={this.handleShowLoginTab}>Log In</a>
					<a className={this.state.LoginTab ? "": "active"} onClick={this.handleShowSignupTab}>Sign Up</a>
				</div>

				<form method="post" style={this.state.LoginTab ? {} : { display: "none"}}>
					<div className="form-field">
						<input type="text" placeholder="Username/Email" aria-label="Username or Email" name="username" required></input>
					</div>
					<div className="form-field">
						<input type="password" placeholder="Password" aria-label="Password" name="password" required></input>
					</div>
					<label className="form-check">
						<input type="checkbox" name="permanent"></input> Remember Me
					</label>
					<div className="form-submit">
						<button className="button buttong--green">Log In</button>
						<a>Find Password</a>
					</div>
				</form>

				<form method="post" style={this.state.LoginTab ? { display: "none"} : {}}>
					<div className="form-field">
						<input type="email" placeholder="Email" aria-label="Email" name="email" required></input>
					</div>
					<div className="form-submit">
						<button className="button buttong--green">Sign Up</button>
					</div>
				</form>
				<div className="login-social">
					<h3>Login With</h3>
					<div className="login-buttons">
						<a className="button login">
							<i className="qc-icon-google"></i> GOOGLE
						</a>
					</div>
				</div>
			</div>
        );
    }
});

module.exports = LoginForm;
