// ACCOUNT-DROPDOWN

import React from 'react';
import './account-dropdown.css';

import AccountSignin from '../../containers/account-signin';

const AccountDropdown = ({ email, hideDropDown }) => {

  return (
    <div className="account-dropdown">
      {!email && <AccountSignin hideDropDown={hideDropDown} />}
    </div>
  );
};

export default AccountDropdown;
