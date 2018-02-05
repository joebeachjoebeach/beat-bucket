// CREATE-ACCOUNT-FORM

import React, { Component } from 'react';
import './create-account-form.css';

import InputWithMessage from '../input-with-message';

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confPassword: '' };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleConfPasswordChange(event) {
    this.setState({ confPassword: event.target.value });
  }

  render() {
    const { email, password, confPassword } = this.state;
    return (
      <form
        className="signin-form"
        onSubmit={this.props.onCreateAccountSubmit(email, password, confPassword)}
      >
        <InputWithMessage
          type="email"
          placeholder="email address"
          value={email}
          onChange={this.handleEmailChange}
          inputRef={el => { this.emailInput = el; }}
          required
        />
        <InputWithMessage
          type="password"
          placeholder="password"
          value={password}
          onChange={this.handlePasswordChange}
          required
          minLength="6"
        />
        <InputWithMessage
          type="password"
          placeholder="confirm password"
          value={confPassword}
          onChange={this.handleConfPasswordChange}
          required
          minLength="6"
        />
        <input
          className="signin-form-item button-light"
          type="submit"
          value="Create Account"
        />
      </form>
    );
  }
}

export default CreateAccountForm;
