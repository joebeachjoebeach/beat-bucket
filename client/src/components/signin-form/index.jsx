// SIGNIN-FORM

import React, { Component } from 'react';
import './signin-form.css';

import InputWithMessage from '../input-with-message';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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

  render() {
    const { message, onCreateClick, onSignInSubmit } = this.props;
    const { email, password } = this.state;
    return (
      <div className="signin-container">
        {message && message}
        <form className="signin-form" onSubmit={onSignInSubmit(email, password)}>
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
