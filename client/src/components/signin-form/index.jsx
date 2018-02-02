// SIGNIN-FORM

import React, { Component } from 'react';
import './signin-form.css';

class SigninForm extends Component {

  componentDidMount() {
    this.emailInput.focus();
  }

  render() {
    const { message, onCreateClick } = this.props;
    return (
      <div className="signin-container">
        {message && message}
        <form className="signin-form">
          <input
            className="signin-form-item input-dark"
            type="text"
            placeholder="email address"
            ref={(input) => { this.emailInput = input; }}
          />
          <input
            className="signin-form-item input-dark"
            type="text"
            placeholder="password"
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
