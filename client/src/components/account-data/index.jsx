// ACCOUNT-DATA

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser } from '../../redux/actions/actions-user';
import { loadProject } from '../../redux/actions/actions-project';
import { selectUserId, selectProjects } from '../../redux/selectors';
import { API_BASE_URL } from '../../utils';
import './account-data.css';

function AccountData(props) {

  function handleSignOut() {
    const { setUser, hideDropDown } = props;
    localStorage.removeItem('authToken');
    setUser({ email: null, userId: null });
    hideDropDown();
  }

  function handleProjectClick(id) {
    const { loadProject, hideDropDown } = props;
    return () => {
      const jwt = localStorage.getItem('authToken');
      axios.get(
        `${API_BASE_URL}project/${id}`,
        { headers: { Authorization: `Bearer ${jwt}`} }
      )
        .then(res => {
          loadProject({ data: res.data.project, id: res.data.id });
          hideDropDown();
        })
        .catch(e => {
          const { error } = e.response.data;
          if (error === 'Invalid token')
            handleSignOut();
        });
    };
  }

  function renderProjectsList() {
    return Object.keys(props.projects).map(id => {
      const name = props.projects[id];
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
  return { id: selectUserId(state), projects: selectProjects(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUser, loadProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountData);
