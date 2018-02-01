// ACCOUNT-SIGNIN

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import { bindActionCreators } from 'redux';
import './account-signin.css';

const SigninForm = ({ onCreateClick }) => {
  return (
    <div className="signin-container">
      <form className="signin-form">
        <input className="signin-form-item" type="text" placeholder="email address" />
        <input className="signin-form-item" type="text" placeholder="password" />
        <input className="signin-form-item" type="submit" value="Log In" />
      </form>
      <button onClick={onCreateClick}>Create Account</button>
    </div>  
  );
};

class CreateAccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', confPassword: '' };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfPasswordChange = this.handleConfPasswordChange.bind(this);
    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
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

  handleCreateAccountSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    axios.post(
      'http://127.0.0.1:5000/auth/register',
      { email, password }
    )
      .then(res => { console.log(res); })
      .catch(e => { console.log(e); });
  }

  render() {
    const { email, password, confPassword } = this.state;
    return (
      <form className="signin-form" onSubmit={this.handleCreateAccountSubmit}>
        <input
          className="signin-form-item"
          type="email"
          placeholder="email address"
          value={email}
          onChange={this.handleEmailChange}
        />
        <input
          className="signin-form-item"
          type="password"
          placeholder="password"
          value={password}
          onChange={this.handlePasswordChange}
        />
        <input
          className="signin-form-item"
          type="password"
          placeholder="confirm password"
          value={confPassword}
          onChange={this.handleConfPasswordChange}
        />
        <input
          className="signin-form-item"
          type="submit"
          value="Create Account"
        />
      </form>
    );
  }
}

class AccountSignin extends Component {
  constructor(props) {
    super(props);
    this.state = { createAccount: false };
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleCreateClick(event) {
    event.preventDefault();
    this.setState({ createAccount: true });
  }

  render() {
    return (
      <div className="account-signin">
        {
          this.state.createAccount
            ? <CreateAccountForm />
            : <SigninForm onCreateClick={this.handleCreateClick} />
        }
      </div>
    );
  }
}


function mapStateToProps(state) {
  return state;
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(_, dispatch);
// }

export default connect(mapStateToProps)(AccountSignin);
