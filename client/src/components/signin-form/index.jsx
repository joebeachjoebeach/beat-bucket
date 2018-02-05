// SIGNIN-FORM

import React, { Component } from 'react';
import axios from 'axios';
import './signin-form.css';

import InputWithMessage from '../input-with-message';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSigninSubmit = this.handleSigninSubmit.bind(this);
  }

  componentDidMount() {
    this.emailEl.focus();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSigninSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    axios.post(
      'http://127.0.0.1:5000/auth/login',
      { email, password }
    )
      .then(res => {
        console.log(res);
        const { authToken, email, userId } = res.data;
        localStorage.setItem('authToken', authToken);
        this.props.onSignIn(email, userId);
      })
      .catch(e => {
        console.log(e);
        console.log(e.response);
      });
  }

  render() {
    const { message, onCreateClick } = this.props;
    return (
      <div className="signin-container">
        {message && message}
        <form className="signin-form" onSubmit={this.handleSigninSubmit}>
          <InputWithMessage
            type="email"
            placeholder="email address"
            inputRef={el => { this.emailEl = el; }}
            onChange={this.handleEmailChange}
            required
          />
          <InputWithMessage
            type="password"
            placeholder="password"
            onChange={this.handlePasswordChange}
            required
          />
          <input
            className="signin-form-item button-light"
            type="submit"
            value="Log In"
          />
        </form>
        <a href="#" onClick={onCreateClick}>Create Account</a>
      </div>  
    );
  }
}

export default SigninForm;
