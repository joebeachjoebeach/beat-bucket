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
    this.onFormSubmit = this.onFormSubmit.bind(this);
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

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.email, this.state.password);
  }

  validateForm() {
    this.setState({ formValid: this.state.email && this.state.password });
  }

  render() {
    const { message, onCreateClick, loading } = this.props;
    const { formValid } = this.state;
    return (
      <div className="signin-container">
        <div className="signin-message">{message && message}</div>
        <form className="signin-form" onSubmit={this.onFormSubmit}>
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
            disabled={!formValid || loading}
          />
        </form>
        <button className="button-link" onClick={onCreateClick}>Create Account</button>
      </div>  
    );
  }
}

export default SigninForm;
