// PROJECT

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import axios from 'axios';
import {
  play,
  stop,
  changeProjectName,
  setProjectId,
  deleteProject } from '../../redux/actions/actions-project';
import { save } from '../../redux/actions/actions-user';
import { selectProject, selectCanSave } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';
import { API_BASE_URL } from '../../utils';

import './project.css';

import Tracks from '../tracks';
import EditableText from '../../components/editable-text';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = { editingName: false, saving: false };

    this.handlePlayStopClick = this.handlePlayStopClick.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handlePlayStopClick() {
    const { playing, stop, play } = this.props;
    playing
      ? stop()
      : play();
  }

  handleNameClick() {
    this.setState({ editingName: true });
  }

  handleNameBlur() {
    this.setState({ editingName: false });
  }

  handleProjectNameChange(newName) {
    this.props.changeProjectName({ name: newName });
  }

  handleSaveClick() {
    const jwt = localStorage.getItem('authToken');
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
            console.log(res);
            const { projectId } = res.data;
            setProjectId({ id: projectId });
            this.setState({ saving: false });
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
            window.alert(e.response.data.error);
            this.setState({ saving: false });
          });
      }
      else {
        this.setState({ saving: true });
        axios.patch(
          `${API_BASE_URL}save`,
          { bpm, name, tracks, shared, id },
          { headers: { Authorization: `Bearer ${jwt}`}}
        )
          .then(res => {
            console.log(res);
            save();
            this.setState({ saving: false });
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
            window.alert(e.response.data.error);
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
        .then(res => {
          console.log(res);
          window.alert('Project successfully deleted');
          deleteProject();
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        });
    }
  }

  renderPlayStop() {
    const className = this.props.playing ? 'stop' : 'play';
    return (
      <button onClick={this.handlePlayStopClick} className="playstop-button button-dark">
        <div className={className} />
      </button>
    );
  }

  render() {
    const { name, canSave } = this.props;
    return this.props.connectDropTarget(
      <div className="project">
        <div className="project-header">
          <div className="project-title">
            <EditableText
              value={name}
              onInputChange={this.handleProjectNameChange}
            />
          </div>
          {this.renderPlayStop()}
          <div />
          <div>
            {/*<button className="project-button button-dark">Share</button>*/}
            <button
              className="project-button button-dark"
              onClick={this.handleDeleteClick}
            >
              Delete
            </button>
            <button
              className="project-button button-dark"
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
        <Tracks />
      </div>
    );
  }
}

const projectTarget = {
  drop(_, monitor) {
    // if it's been dropped on a child target, don't do anything
    if (monitor.didDrop())
      return;
    return { target: 'delete' };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps(state) {
  return {
    ...selectProject(state),
    canSave: selectCanSave(state)
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    play,
    stop,
    changeProjectName,
    setProjectId,
    save,
    deleteProject
  };
  return bindActionCreators(actions, dispatch);
}

const dt_Project = DropTarget(ItemTypes.NOTE, projectTarget, collect)(Project);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Project);
