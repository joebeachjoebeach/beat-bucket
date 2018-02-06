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
  setProjectId } from '../../redux/actions/actions-project';
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
    this.state = { editingName: false };

    this.handlePlayStopClick = this.handlePlayStopClick.bind(this);
    this.handleNameClick = this.handleNameClick.bind(this);
    this.handleNameBlur = this.handleNameBlur.bind(this);
    this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
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
    const { bpm, name, tracks, shared, id, canSave, setProjectId, save } = this.props;
    if (canSave) {
      if (!id) {
        console.log('saving track [POST]');
        axios.post(
          `${API_BASE_URL}save`,
          { bpm, name, tracks, shared },
          { headers: { Authorization: `Bearer ${jwt}`}}
        )
          .then(res => {
            console.log(res);
            const { projectId } = res.data;
            setProjectId({ id: projectId });
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
          });
      }
      else {
        console.log('saving track [PATCH]');
        axios.patch(
          `${API_BASE_URL}save`,
          { bpm, name, tracks, shared, id },
          { headers: { Authorization: `Bearer ${jwt}`}}
        )
          .then(res => {
            console.log(res);
            save();
          })
          .catch(e => {
            console.log(e);
            console.log(e.response);
          });
      }
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
          <button
            className="save-button button-dark"
            onClick={this.handleSaveClick}
            disabled={!canSave}
          >
            {canSave
              ? 'Save'
              : 'Saved'}
          </button>
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
    save
  };
  return bindActionCreators(actions, dispatch);
}

const dt_Project = DropTarget(ItemTypes.NOTE, projectTarget, collect)(Project);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Project);
