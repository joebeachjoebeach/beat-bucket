// HEADER

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { selectEmail } from '../../redux/selectors';
import { createNewProject } from '../../redux/actions/actions-project';
import { WEB_BASE_URL } from '../../utils';
import './header.css';

import AccountDropdown from '../../components/account-dropdown';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { showDropDown: false };
    this.toggleHideShow = this.toggleHideShow.bind(this);
    this.handleNewProjectClick = this.handleNewProjectClick.bind(this);
  }

  toggleHideShow() {
    this.setState(prevState => ({
      showDropDown: !prevState.showDropDown
    }));
  }

  handleNewProjectClick() {
    this.props.createNewProject();
  }

  render() {
    const { email } = this.props;
    return (
      <header className="header">
        <div className="header-title">
          <a href={WEB_BASE_URL} className="header-link">Beat Bucket</a>
        </div>
        <div className="header-account">
          <Link to="/">
            <button
              className="button-light header-button"
              onClick={this.handleNewProjectClick}
            >
              New Project
            </button>
          </Link>
          <button
            onClick={this.toggleHideShow}
            className="button-light header-button"
          >
            {email ? email + ' ⌄' : 'Sign In ⌄'}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createNewProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
