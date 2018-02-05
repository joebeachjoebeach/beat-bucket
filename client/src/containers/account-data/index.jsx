// ACCOUNT-DATA

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../../redux/actions/actions-user';
import './account-data.css';

class AccountData extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    const { setUser, hideDropDown } = this.props;
    localStorage.removeItem('authToken');
    setUser({ email: null, userId: null });
    hideDropDown();
  }


  render() {
    return (
      <div className="account-data">
        <button
          className="button-light"
          onClick={this.handleSignOut}
        >
          Sign Out
        </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountData);
