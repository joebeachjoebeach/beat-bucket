// HEADER

import React from 'react';
import './header.css';

import AccountBar from '../../containers/account-bar';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Beat Bucket</div>
      <AccountBar />
    </header>
  );
};

export default Header;
