// PROJECT

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { play, stop } from '../../redux/actions/actions-globals';
import { selectPlaying } from '../../redux/selectors';
import './project.css';

import Tracks from '../tracks';

const Project = ({ play, stop, playing }) => {

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

  return (
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


function mapStateToProps(state) {
  return { playing: selectPlaying(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ play, stop }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Project);
