// ACCOUNT-SIGNIN

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { setUser, loadProjects } from '../../redux/actions/actions-user.js';
import { API_BASE_URL, resourceRequest, signIn, register } from '../../utils';
import './account-signin.css';

import CreateAccountForm from '../create-account-form';
import SigninForm from '../signin-form';

class AccountSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      signinMessage: '',
      createAccountMessage: '',
      loading: false
    };
    this.toggleCreateAccount = this.toggleCreateAccount.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
  }

  toggleCreateAccount() {
    this.setState(prevState => ({ createAccount: !prevState.createAccount }));
  }

  handleCreateAccountSubmit(email, password1, password2) {
    if (password1 === password2) {
      this.setState({ loading: true });
      register(
        { email, password: password1 },
        {
          success: () => {
            this.setState({
              createAccount: false,
              signinMessage: 'Account created. You may now sign in.',
              loading: false
            });
          },
          failure: err => {
            this.setState({
              createAccountMessage: err.response.data.error,
              loading: false
            });
          }
        }
      );
    }
  }

  handleSignInSubmit(email, password) {
    const { setUser, hideDropDown, loadProjects } = this.props;
    this.setState({ loading: true });
    signIn(
      { email, password },
      {
        success: (res) => {
          this.setState({ loading: false });
          hideDropDown();
          setUser({ email: res.data.email, id: res.data.userId });
          resourceRequest('get', 'projects', {
            success: res => { loadProjects(res.data.projects); },
            failure: err => { console.log(err); },
            authFailure: err => { console.log(err); }
          });
        },
        failure: err => {
          let errorMessage;
          if (err.response)
            errorMessage = err.response.data.error;
          this.setState({
            signinMessage: errorMessage,
            loading: false
          });
        }
      }
    );
  }

  render() {
    const { signinMessage, createAccountMessage, loading } = this.state;
    return (
      <div className="account-signin">
        {
          this.state.createAccount
            ? <CreateAccountForm
              message={createAccountMessage}
              onCancelClick={this.toggleCreateAccount}
              onSubmit={this.handleCreateAccountSubmit}
              loading={loading}
            />
            : <SigninForm
              message={signinMessage}
              onCreateClick={this.toggleCreateAccount}
              onSubmit={this.handleSignInSubmit}
              loading={loading}
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
  return bindActionCreators({ setUser, loadProjects }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSignin);
