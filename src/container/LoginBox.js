import React from 'react';
import axios from 'axios';

export default class LoginBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = { username: '', password: '', errors: [] };
  }

  showValidationErr(elm, msg) {
    this.setState(prevState => ({ errors: [...prevState.errors, { elm, msg }] }));
  }

  clearValidationErr(elm) {
    this.setState(prevState => {
      let newArr = [];
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return { errors: newArr };
    });
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
    this.clearValidationErr('username');
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
    this.clearValidationErr('password');
  }

  submitLogin(e) {
    if (this.state.username === '' || this.state.password === '') {
      this.showValidationErr('error', 'Username or Password is incorrect!');
    }

    console.log('Logging in!');
    axios.post('http://localhost:8080/auth/login', {}, { params: { username: this.state.username, password: this.state.password }}).then((response) => {
      console.log(response);
    });

  }

  render() {
    let error = false;

    for (let err of this.state.errors) {
      if (err.elm === 'error') {
        error = err.msg;
      }
    }

    return (
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this.onUsernameChange.bind(this)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this.onPasswordChange.bind(this)}
            />
            <small className="danger-error">{error} </small>
          </div>

          <button type="button" className="login-btn" onClick={this.submitLogin.bind(this)}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
