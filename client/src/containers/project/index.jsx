// PROJECT

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import { play, stop } from '../../redux/actions/actions-globals';
import { selectPlaying } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';

import './project.css';

import Tracks from '../tracks';

const Project = ({ play, stop, playing, connectDropTarget }) => {

  function handlePlayStopClick() {
    playing
      ? stop()
      : play();
  }

  function renderPlayStop() {
    const className = playing ? 'stop' : 'play';
    return (
      <button onClick={handlePlayStopClick} className="project-playbutton">
        <div className={className} />
      </button>
    );
  }

  return connectDropTarget(
    <div className="project">
      <div className="project-header">
        <div className="project-header-title">Project Title</div>
        {renderPlayStop()}
        <button className="project-savebutton">Save</button>
      </div>
      <Tracks />
    </div>
  );
};

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
  return { playing: selectPlaying(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ play, stop }, dispatch);
}

const dt_Project = DropTarget(ItemTypes.NOTE, projectTarget, collect)(Project);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Project);
