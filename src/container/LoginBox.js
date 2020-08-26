import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from "../libs/contextLib";

export default function () {

    const { userHasAuthenticated } = useAppContext();

    const [username, setUsername] = useState('');

    const[password, setPassword] = useState('');

    const[errors, setErrors] = useState([]);

    const error = false;


  const showValidationErr = (elm, msg) => {
    setErrors({ elm, msg });
  }

  // const clearValidationErr = (elm) => {
  //   this.setState(prevState => {
  //     let newArr = [];
  //     for (let err of prevState.errors) {
  //       if (elm !== err.elm) {
  //         newArr.push(err);
  //       }
  //     }
  //     return { errors: newArr };
  //   });
  // }

  const onUsernameChange = (e) => {
    setUsername( e.target.value );
    //this.clearValidationErr('username');
  }

  const onPasswordChange = (e) => {
    setPassword( e.target.value );
    //this.clearValidationErr('password');
  }

  const submitLogin = (e) => {

        for (let err of errors) {
          if (err.elm === 'error') {
          error = err.msg;
          }
        }

    axios.post('http://localhost:8080/auth/login', {}, { params: { username: username, password: password }}).then((response) => {
      if (username === '' || password === '' || response.data === false) {
        showValidationErr('error', 'Username or Password is incorrect!');
        console.log('Not able to log in!');
      }else {
        //this.clearValidationErr('error');
        userHasAuthenticated(true);
      }
      
    });

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
              onChange={onUsernameChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={onPasswordChange}
            />
            <small className="danger-error">{error} </small>
          </div>

          <button type="button" className="login-btn" onClick={submitLogin}>
            Login
          </button>
        </div>
      </div>
  );
}
