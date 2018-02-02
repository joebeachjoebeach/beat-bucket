// ACCOUNT-SIGNIN

import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
// import { bindActionCreators } from 'redux';
import './account-signin.css';

import CreateAccountForm from '../../components/create-account-form';
import SigninForm from '../../components/signin-form';

class AccountSignin extends Component {
  constructor(props) {
    super(props);
    this.state = { createAccount: false };
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleCreateAccountSuccess = this.handleCreateAccountSuccess.bind(this);
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
            />
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
