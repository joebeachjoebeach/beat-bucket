// ACCOUNT-SIGNIN

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { setUser } from '../../redux/actions/actions-user.js';
import { API_BASE_URL } from '../../utils';
import './account-signin.css';

import CreateAccountForm from '../../components/create-account-form';
import SigninForm from '../../components/signin-form';

class AccountSignin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: false,
      signinMessage: '',
      createAccountMessage: ''
    };
    this.toggleCreateAccount = this.toggleCreateAccount.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
  }

  toggleCreateAccount() {
    this.setState(prevState => ({ createAccount: !prevState.createAccount }));
  }

  handleCreateAccountSubmit(email, password1, password2) {

    return event => {
      event.preventDefault();
      if (password1 === password2) {
        axios.post(
          `${API_BASE_URL}auth/register`,
          { email, password: password1 }
        )
          .then(() => {
            this.setState({
              createAccount: false,
              signinMessage: 'Account created. You may now sign in.'
            });
          })
          .catch(e => {
            this.setState({ createAccountMessage: e.response.data.error });
          });
      }
    };
  }

  handleSignInSubmit(email, password) {
    const { setUser, hideDropDown } = this.props;

    return event => {
      event.preventDefault();
      axios.post(
        `${API_BASE_URL}auth/login`,
        { email, password }
      )
        .then(res => {
          const { authToken, email, userId } = res.data;
          localStorage.setItem('authToken', authToken);
          setUser({ email, id: userId });
          hideDropDown();
        })
        .catch(e => {
          this.setState({
            signinMessage: e.response.data.error
          });
        });
    };
  }

  render() {
    const { signinMessage, createAccountMessage } = this.state;
    return (
      <div className="account-signin">
        {
          this.state.createAccount
            ? <CreateAccountForm
              message={createAccountMessage}
              onCancelClick={this.toggleCreateAccount}
              onCreateAccountSubmit={this.handleCreateAccountSubmit}
            />
            : <SigninForm
              message={signinMessage}
              onCreateClick={this.toggleCreateAccount}
              onSignInSubmit={this.handleSignInSubmit}
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
