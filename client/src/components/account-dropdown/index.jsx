// ACCOUNT-DROPDOWN

import React from 'react';
import './account-dropdown.css';

import AccountSignin from '../../containers/account-signin';

const AccountDropdown = ({ email }) => {

  return (
    <div className="account-dropdown">
      {!email && <AccountSignin />}
    </div>
  );
};

export default AccountDropdown;
