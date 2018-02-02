// SIGNIN-FORM

import React, { Component } from 'react';
import './signin-form.css';

import InputWithMessage from '../input-with-message';

class SigninForm extends Component {

  componentDidMount() {
    this.emailEl.focus();
  }

  render() {
    const { message, onCreateClick } = this.props;
    return (
      <div className="signin-container">
        {message && message}
        <form className="signin-form">
          <InputWithMessage
            type="email"
            placeholder="email address"
            inputRef={el => { this.emailEl = el; }}
            required
          />
          <InputWithMessage
            type="password"
            placeholder="password"
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
