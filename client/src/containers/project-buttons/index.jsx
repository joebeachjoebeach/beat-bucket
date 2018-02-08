// PROJECT-BUTTONS

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectCanSave, selectEmail } from '../../redux/selectors';
import {
  play,
  stop,
  changeBPM,
  deleteProject } from '../../redux/actions/actions-project';
import { save } from '../../redux/actions/actions-user';
import { API_BASE_URL } from '../../utils';
import './project-buttons.css';

class ProjectButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = { saving: false, message: '' };
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.handlePlayStopClick = this.handlePlayStopClick.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
  }

  componentDidUpdate() {
    this.state.message &&
      setTimeout(() => { this.hideMessage(); }, 3000);
  }

  handlePlayStopClick() {
    const { playing, stop, play } = this.props;
    playing
      ? stop()
      : play();
  }

  handleBPMChange(event) {
    let newBPM = Number(event.target.value);
    this.props.changeBPM({ bpm: newBPM });
  }

  handleSaveClick() {
    const jwt = localStorage.getItem('authToken');
    if (!jwt || !this.props.email) {
      this.setState({ message: 'Please sign in to save your project' });
      return;
    }
    const {
      bpm,
      name,
      tracks,
      shared,
      id,
      canSave,
      setProjectId,
      save } = this.props;
    if (canSave) {
      if (!id) {
        this.setState({ saving: true });
        axios.post(
          `${API_BASE_URL}save`,
          { bpm, name, tracks, shared },
          { headers: { Authorization: `Bearer ${jwt}`} }
        )
          .then(res => {
            const { projectId } = res.data;
            setProjectId({ id: projectId });
            this.setState({ saving: false });
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
            const { error } = e.response.data;
            let errorMessage = error;
            if (error === 'Invalid token')
              errorMessage = 'Please sign in to save your project';
            this.setState({ message: errorMessage, saving: false });
          });
      }
      else {
        this.setState({ saving: true });
        axios.patch(
          `${API_BASE_URL}save`,
          { bpm, name, tracks, shared, id },
          { headers: { Authorization: `Bearer ${jwt}`}}
        )
          .then(() => {
            save();
            this.setState({ saving: false });
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
            const { error } = e.response.data;
            let errorMessage = error;
            if (error === 'Invalid token')
              errorMessage = 'Please sign in to save your project';
            this.setState({ message: errorMessage, saving: false });
            this.setState({ saving: false });
          });
      }
    }
  }

  handleDeleteClick() {
    const { id, name, deleteProject } = this.props;
    const jwt = localStorage.getItem('authToken');

    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      axios.delete(
        `${API_BASE_URL}project/${id}`,
        { headers: { Authorization: `Bearer ${jwt}`} }
      )
        .then(() => {
          // window.alert('Project successfully deleted');
          this.setState({ message: 'Project deleted successfully'});
          deleteProject();
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        });
    }
  }

  hideMessage() {
    this.setState({ message: '' });
  }

  renderPlayStop() {
    const className = this.props.playing ? 'stop' : 'play';
    return (
      <button
        title={className}
        onClick={this.handlePlayStopClick}
        className="playstop-button button-dark"
      >
        <div className={className} />
      </button>
    );
  }

  render() {
    const { canSave, email, id, bpm } = this.props;
    const { message } = this.state;
    return (
      <div className="project-buttons">
        <div className="project-buttons-buttons">
          <div className="project-buttons-left">
            <div className="bpm-play">
              {this.renderPlayStop()}
              <input
                title="change bpm"
                name="bpm"
                className="button-dark bpm-input"
                type="number"
                min="20"
                max="400"
                value={bpm}
                onChange={this.handleBPMChange}
              />
              <label htmlFor="bpm" className="bpm-label">bpm</label>
            </div>
          </div>
          <div className="project-buttons-right">
            {/*<button className="button-dark project-button">Share</button>*/}
            {email && id &&
              <button
                className="button-dark project-button"
                onClick={this.handleDeleteClick}
              >
                Delete
              </button>
            }
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
          </div>
        </div>
        <div className="project-buttons-message">
          {message &&
            <span>
              {message}
              <button
                title="hide message"
                className="button-dark close-message"
                onClick={this.hideMessage}
              >
                x
              </button>
            </span>
          }
        </div>
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
  return bindActionCreators({ play, stop, changeBPM, deleteProject, save }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectButtons);
