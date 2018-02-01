// HEADER

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectEmail } from '../../redux/selectors';
import './header.css';

import AccountDropdown from '../../components/account-dropdown';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showDropDown: false };
    this.handleAccountClick = this.handleAccountClick.bind(this);
  }

  handleAccountClick() {
    this.setState(prevState => ({
      showDropDown: !prevState.showDropDown
    }));
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="header-title">Beat Bucket</div>
        <div className="header-account">
          <button onClick={this.handleAccountClick}>{email ? email : 'Account'}</button>
          {this.state.showDropDown && <AccountDropdown email={email} />}
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { email: selectEmail(state) };
}

export default connect(mapStateToProps)(Header);
