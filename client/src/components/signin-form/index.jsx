// SIGNIN-FORM

import React, { Component } from 'react';
import './signin-form.css';

import InputWithMessage from '../input-with-message';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  componentDidMount() {
    this.emailEl.focus();
  }

  handleInputChange(field) {
    return event => {
      const { value } = event.target;
      this.setState({ [field]: value });
    };
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
            onChange={this.handleInputChange('email')}
            required
          />
          <InputWithMessage
            type="password"
            placeholder="password"
            onChange={this.handleInputChange('password')}
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
