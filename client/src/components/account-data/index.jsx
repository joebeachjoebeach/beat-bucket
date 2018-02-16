// ACCOUNT-DATA

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../../redux/actions/actions-user';
import { loadProject } from '../../redux/actions/actions-project';
import { selectProjects } from '../../redux/selectors';
import { API_BASE_URL, resourceRequest } from '../../utils';
import './account-data.css';

function AccountData({ projects, setUser, hideDropDown, loadProject}) {

  function handleSignOut() {
    localStorage.removeItem('authToken');
    setUser({ email: null, userId: null });
    hideDropDown();
  }

  function handleProjectClick(id) {
    return () => {
      resourceRequest('get', `project/${id}`, {
        success: res => {
          loadProject({ data: res.data.project, id: res.data.id });
          hideDropDown();
        },
        failure: err => {
          const { error } = err.response.data;
          if (error === 'Invalid token')
            handleSignOut();
        }
      });
    };
  }

  function renderProjectsList() {
    return Object.keys(projects).map(id => {
      const name = projects[id];
      return (
        <button
          className="project-list-button"
          key={id}
          onClick={handleProjectClick(id)}
        >
          {name}
        </button>
      );
    }).reverse();
  }

  return (
    <div className="account-data">
      <div className="project-list">
        <header className="project-list-header">my projects:</header>
        {renderProjectsList()}
      </div>
      <button
        className="button-light"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return { projects: selectProjects(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser, loadProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountData);
