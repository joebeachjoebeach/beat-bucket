// SIGNIN-FORM

import React, { Component } from 'react';
import './signin-form.css';

import InputWithMessage from '../input-with-message';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formValid: false
    };
  }

  componentDidMount() {
    this.emailEl.focus();
  }

  handleInputChange(field) {
    return event => {
      const { value } = event.target;
      this.setState({ [field]: value }, this.validateForm);
    };
  }

  validateForm() {
    this.setState({ formValid: this.state.email && this.state.password });
  }

  render() {
    const { message, onCreateClick, onSignInSubmit } = this.props;
    const { email, password, formValid } = this.state;
    return (
      <div className="signin-container">
        <div className="signin-message">{message && message}</div>
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
            value="Sign In"
            disabled={!formValid}
          />
        </form>
        <button className="button-link" onClick={onCreateClick}>Create Account</button>
      </div>  
    );
  }
}

export default SigninForm;
