// ACCOUNT-SIGNIN

import React, { Component } from 'react';
import { connect } from 'react-redux';
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

const CreateAccountForm = () => {
  return (
    <form className="signin-form">
      <input className="signin-form-item" type="text" placeholder="email address" />
      <input className="signin-form-item" type="text" placeholder="password" />
      <input className="signin-form-item" type="text" placeholder="confirm password" />
      <input className="signin-form-item" type="submit" value="Create Account" />
    </form>
  );
};

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
