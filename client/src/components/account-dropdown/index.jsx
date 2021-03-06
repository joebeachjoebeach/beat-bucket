// ACCOUNT-DROPDOWN

import React from 'react';
import './account-dropdown.css';

import AccountSignin from '../account-signin';
import AccountData from '../account-data';

const AccountDropdown = ({ email, hideDropDown }) => {

  return (
    <div className="account-dropdown">
      {email
        ? <AccountData hideDropDown={hideDropDown} />
        : <AccountSignin hideDropDown={hideDropDown} />}
    </div>
  );
};

export default AccountDropdown;
