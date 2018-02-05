// ACCOUNT-SIGNIN

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { bindActionCreators } from 'redux';
import { setUser } from '../../redux/actions/actions-user.js';
import './account-signin.css';

import CreateAccountForm from '../../components/create-account-form';
import SigninForm from '../../components/signin-form';

class AccountSignin extends Component {
  constructor(props) {
    super(props);
    this.state = { createAccount: false };
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCreateAccountSuccess = this.handleCreateAccountSuccess.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleCreateClick(event) {
    event.preventDefault();
    this.setState({ createAccount: true });
  }

  handleCreateAccountSuccess() {
    this.setState({
      createAccount: false,
      signinMessage: 'Account created. You may now sign in.'
    });
  }

  handleSignIn(email, id) {
    const { setUser, hideDropDown } = this.props;
    setUser({ email, id });
    hideDropDown();
  }

  render() {
    return (
      <div className="account-signin">
        {
          this.state.createAccount
            ? <CreateAccountForm
              onSuccess={this.handleCreateAccountSuccess}
            />
            : <SigninForm
              message={this.state.signinMessage}
              onCreateClick={this.handleCreateClick}
              onSignIn={this.handleSignIn}
            />
        }
      </div>
    );
  }
}


function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSignin);
