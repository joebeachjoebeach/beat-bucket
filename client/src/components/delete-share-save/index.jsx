// DELETE-SHARE-SAVE

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { selectCanSave, selectEmail } from '../../redux/selectors';
import { deleteProject } from '../../redux/actions/actions-project';
import { setUser, save } from '../../redux/actions/actions-user';
import { API_BASE_URL, resourceRequest } from '../../utils';
import './delete-share-save.css';

import Sharing from '../sharing';

class DeleteShareSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saving: false, showDropDown: false };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleSharingClick = this.handleSharingClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  handleSaveClick() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken || !this.props.email) {
      this.props.setMessage('Please sign in to save your project');
      return;
    }

    const {
      bpm,
      name,
      tracks,
      shared,
      id,
      canSave,
      save,
      setMessage,
      setUser } = this.props;

    if (canSave) {
      this.setState({ saving: true });
      // if the project has no id, then we need a POST request to /save
      if (!id) {
        resourceRequest('post', 'save', {
          success: res => {
            save({ id: res.data.projectId, name });
            this.setState({ saving: false });
          },
          failure: err => {
            setMessage(err.response.data);
            this.setState({ saving: false });
          },
          authFailure: () => {
            setUser({ email: null, userId: null });
            this.setState({ saving: false });
          }
        },
        { bpm, name, tracks, shared });
      }

      // if the project has an id, we need a PUT request to /save
      else {
        resourceRequest('put', 'save', {
          success: () => {
            save({ id, name });
            this.setState({ saving: false });
          },
          failure: err => {
            setMessage(err.response.data);
            this.setState({ saving: false });
          },
          authFailure: () => {
            setUser({ email: null, userId: null });
            this.setState({ saving: false });
          }
        },
        { bpm, name, tracks, shared, id });
      }
    }
  }

  handleDeleteClick() {
    const { id, name, deleteProject, setMessage } = this.props;
    const jwt = localStorage.getItem('authToken');

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete(
        `${API_BASE_URL}project/${id}`,
        { headers: { Authorization: `Bearer ${jwt}`} }
      )
        .then(() => {
          setMessage('Project deleted successfully');
          deleteProject(id);
        })
        .catch(e => {
          const { error } = e.response.data;
          let errorMessage = error;
          if (error === 'Invalid token') {
            errorMessage = 'Please sign in to delete your project';
            localStorage.removeItem('authToken');
            this.props.setUser({ email: null, userId: null });
          }
          setMessage(errorMessage);
        });
    }
  }

  handleSharingClick() {
    this.setState(prevState => ({ showDropDown: !prevState.showDropDown }));
  }

  render() {
    const { canSave, email, id } = this.props;
    return (
      <div className="delete-share-save">
        {email && id && [
          <button
            className="button-dark project-button sharing-button"
            key="share"
            onClick={this.handleSharingClick}
          >
            Share ⌄
          </button>,
          <button
            className="button-dark project-button"
            key="delete"
            onClick={this.handleDeleteClick}
          >
            Delete
          </button>
        ]}
        <Link to="/">
          <button
            className="button-dark project-button"
            onClick={this.handleSaveClick}
            disabled={!canSave}
          >
            {this.state.saving
              ? 'Saving'
              : canSave
                ? 'Save'
                : 'Saved'}
          </button>
        </Link>
        {this.state.showDropDown &&
          <Sharing
            {...this.props}
            hideDropDown={() => this.setState({ showDropDown: false })}
            setMessage={this.props.setMessage}
          />
        }
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    canSave: selectCanSave(state),
    email: selectEmail(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteProject, save, setUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteShareSave);
