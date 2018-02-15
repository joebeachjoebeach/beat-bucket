// CREATE-ACCOUNT-FORM

import React, { Component } from 'react';
import './create-account-form.css';

import InputWithMessage from '../input-with-message';

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confPassword: '',
      errors: {
        email: '',
        password: '',
        confPassword: ''
      },
      emailValid: false,
      passwordValid: false,
      confPasswordValid: false,
      formValid: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  handleInputChange(field) {
    return event => {
      const { value } = event.target;
      this.setState({ [field]: value }, () => { this.validateInput(field, value); });
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { email, password, confPassword } = this.state;
    this.props.onSubmit(email, password, confPassword);
  }

  validateInput(field, value) {
    const errors = { ...this.state.errors };
    let { emailValid, passwordValid, confPasswordValid } = this.state;

    switch(field) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      errors.email = emailValid
        ? ''
        : 'Invalid email address';
      break;

    case 'password':
      passwordValid = value.length >= 6;
      errors.password = passwordValid
        ? ''
        : 'Minimum 6 characters';
      confPasswordValid = value === this.state.confPassword;
      errors.confPassword = confPasswordValid
        ? ''
        : 'Passwords don\'t match';
      break;

    case 'confPassword':
      confPasswordValid = value === this.state.password;
      errors.confPassword = confPasswordValid
        ? ''
        : 'Passwords don\'t match';
      break;

    default:
      break;
    }

    this.setState({
      errors,
      emailValid,
      passwordValid,
      confPasswordValid,
      formValid: emailValid && passwordValid && confPasswordValid
    });
  }

  render() {
    const { email, password, confPassword, errors, formValid } = this.state;
    const { message, loading } = this.props;
    return (
      <div>
        <div className="create-account-message">{message && message}</div>
        <form
          className="create-account-form"
          onSubmit={this.handleFormSubmit}
        >
          <InputWithMessage
            type="email"
            placeholder="email address"
            value={email}
            onChange={this.handleInputChange('email')}
            inputRef={el => { this.emailInput = el; }}
            required
            message={errors.email}
          />
          <InputWithMessage
            type="password"
            placeholder="password"
            value={password}
            onChange={this.handleInputChange('password')}
            required
            minLength="6"
            message={errors.password}
          />
          <InputWithMessage
            type="password"
            placeholder="confirm password"
            value={confPassword}
            onChange={this.handleInputChange('confPassword')}
            required
            minLength="6"
            message={errors.confPassword}
          />
          <input
            className="signin-form-item button-light"
            type="submit"
            value="Create Account"
            disabled={!formValid || loading}
          />
        </form>
        <button className="button-link" onClick={this.props.onCancelClick}>Cancel</button>
      </div>
    );
  }
}

export default CreateAccountForm;
