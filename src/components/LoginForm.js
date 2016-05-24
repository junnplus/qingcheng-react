import React from 'react';
import ReactDOM from 'react-dom';
import UserSessionActions from '../actions/UserSessionActions';

var LoginForm = React.createClass({
  getInitialState() {
    return {
      username: "",
      password: "",
      email: "",
      LoginTab: true,
      permanent: true,
    };
  },
  handleShowLoginTab() {
    this.setState({LoginTab: true});
  },
  handleShowSignupTab() {
    this.setState({LoginTab: false});
  },
  handleChange(e) {
    var newState = {};
    newState[e.target.name] = e.target.name === "permanent" ? e.target.checked : e.target.value;
    this.setState(newState);
  },
  handleLogin(e) {
    e.preventDefault();
    var data = {
      username : this.state.username,
      password : this.state.password,
      permanent : this.state.permanent
    };
    UserSessionActions.login(data);
  },
  handleSignup(e) {
    e.preventDefault();
    UserSessionActions.signup(this.state.email);
  },
  render() {
    return (
      <div className="login-form">
        <div className="login-tab clearfix">
          <a className={this.state.LoginTab ? "active": ""} onClick={this.handleShowLoginTab}>Log In</a>
          <a className={this.state.LoginTab ? "": "active"} onClick={this.handleShowSignupTab}>Sign Up</a>
        </div>

        <form method="post" onSubmit={ this.handleLogin } style={this.state.LoginTab ? {} : { display: "none"}}>
          <div className="form-field">
            <input type="text" placeholder="Username/Email" aria-label="Username or Email" name="username" required value={ this.state.username } onChange={ this.handleChange }></input>
          </div>
          <div className="form-field">
            <input type="password" placeholder="Password" aria-label="Password" name="password" required value={ this.state.password } onChange={ this.handleChange }></input>
          </div>
          <label className="form-check">
            <input type="checkbox" name="permanent" checked={ this.state.permanent } onChange={ this.handleChange }></input> Remember Me
          </label>
          <div className="form-submit">
            <button className="button buttong--green">Log In</button>
            <a> Find Password</a>
          </div>
        </form>

        <form method="post" onSubmit={ this.handleSignup } style={this.state.LoginTab ? { display: "none"} : {}}>
        <div className="form-field">
          <input type="email" placeholder="Email" aria-label="Email" name="email" required value={ this.state.email } onChange={ this.handleChange }></input>
        </div>
        <div className="form-submit">
          <button className="button buttong--green">Sign Up</button>
        </div>
        </form>
        {
          ((obj) => {
            if ( obj.state.LoginTab ) {
              return (
                <div className="login-social">
                  <h3>Login With</h3>
                  <div className="login-buttons">
                    <a className="button login">
                      <i className="qc-icon-google"></i> GOOGLE
                    </a>
                  </div>
                </div>
              );
            }
          })(this)
        }
      </div>
    );
  }
});

module.exports = LoginForm;
