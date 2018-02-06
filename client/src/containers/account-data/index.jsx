// ACCOUNT-DATA

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../../redux/actions/actions-user';
import { loadProject } from '../../redux/actions/actions-project';
import { selectUserId } from '../../redux/selectors';
import { API_BASE_URL } from '../../utils';
import './account-data.css';

class AccountData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { projects: [] };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    this.getProjectsList();
  }

  getProjectsList() {
    const jwt = localStorage.getItem('authToken');
    axios.get(
      `${API_BASE_URL}projects`,
      { headers: { Authorization: `Bearer ${jwt}`} }
    )
      .then(res => {
        console.log(res);
        this.setState({ projects: res.data.projects });
      })
      .catch(e => {
        console.log(e);
        console.log(e.response);
      });
  }

  handleSignOut() {
    const { setUser, hideDropDown } = this.props;
    localStorage.removeItem('authToken');
    setUser({ email: null, userId: null });
    hideDropDown();
  }

  handleProjectClick(id) {
    const { loadProject, hideDropDown } = this.props;
    return () => {
      const jwt = localStorage.getItem('authToken');
      axios.get(
        `${API_BASE_URL}project/${id}`,
        { headers: { Authorization: `Bearer ${jwt}`} }
      )
        .then(res => {
          console.log(res);
          loadProject({ data: res.data.project });
          hideDropDown();
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        });
    };
  }

  renderProjectsList() {
    return this.state.projects.map(([ id, name ]) => {
      return (
        <button
          className="project-list-button"
          key={id}
          onClick={this.handleProjectClick(id)}
        >
          {name}
        </button>
      );
    }).reverse();
  }

  render() {
    return (
      <div className="account-data">
        <button className="button-light">
          New Project
        </button>
        <div className="project-list">
          <header className="project-list-header">my projects:</header>
          {this.renderProjectsList()}
        </div>
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
  return { id: selectUserId(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser, loadProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountData);
