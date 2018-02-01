// HEADER

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectUsername } from '../../redux/selectors';
import './header.css';

// import AccountBar from '../../containers/account-bar';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showDropDown: false };
  }

  render() {
    const { username } = this.props;
    return (
      <header className="header">
        <div className="header-title">Beat Bucket</div>
        <div className="header-account">
          {/*username ? username : 'Account'*/}
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { username: selectUsername(state) };
}

export default connect(mapStateToProps)(Header);
