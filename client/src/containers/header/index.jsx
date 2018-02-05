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
    this.toggleHideShow = this.toggleHideShow.bind(this);
  }

  toggleHideShow() {
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
          <button
            onClick={this.toggleHideShow}
            className="button-light"
          >
            {email ? email : 'Sign In'}
          </button>
          {this.state.showDropDown && 
            <AccountDropdown
              email={email}
              hideDropDown={this.toggleHideShow}
            />
          }
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { email: selectEmail(state) };
}

export default connect(mapStateToProps)(Header);
