// ACCOUNT-SIGNIN

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
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
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
    this.handleCreateAccountSubmit = this.handleCreateAccountSubmit.bind(this);
  }

  handleCreateClick(event) {
    event.preventDefault();
    this.setState({ createAccount: true });
  }

  handleCreateAccountSubmit(email, password1, password2) {

    return event => {
      event.preventDefault();
      axios.post(
        'http://127.0.0.1:5000/auth/register',
        { email, password: password1 }
      )
        .then(res => {
          console.log(res);
          this.setState({
            createAccount: false,
            signinMessage: 'Account created. You may now sign in.'
          });
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        });
    };
  }

  handleSignInSubmit(email, password) {
    const { setUser, hideDropDown } = this.props;

    return event => {
      event.preventDefault();
      axios.post(
        'http://127.0.0.1:5000/auth/login',
        { email, password }
      )
        .then(res => {
          console.log(res);
          const { authToken, email, userId } = res.data;
          localStorage.setItem('authToken', authToken);
          setUser({ email, id: userId });
          hideDropDown();
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        });
    };
  }

  render() {
    return (
      <div className="account-signin">
        {
          this.state.createAccount
            ? <CreateAccountForm
              onSuccess={this.handleCreateAccountSuccess}
              onCreateAccountSubmit={this.handleCreateAccountSubmit}
            />
            : <SigninForm
              message={this.state.signinMessage}
              onCreateClick={this.handleCreateClick}
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
