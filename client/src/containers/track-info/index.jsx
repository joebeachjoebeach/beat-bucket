// TRACK-INFO

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  mute,
  solo,
  unmute,
  unsolo,
} from '../../redux/actions/actions-track';
import { deleteTrack } from '../../redux/actions/actions-tracks';
import { selectTrack } from '../../redux/selectors';
import './track-info.css';

const TrackInfo = ({
  name,
  id,
  muted,
  soloed,
  mute,
  solo,
  unmute,
  unsolo,
  deleteTrack }) => {

  function handleMuteClick() {
    muted
      ? unmute(id)
      : mute(id);
  }

  function handleSoloClick() {
    soloed
      ? unsolo(id)
      : solo(id);
  }

  function handleDeleteTrackClick() {
    deleteTrack({ trackId: id });
  }

  return (
    <div className="track-info">
      <div className="track-info-left">
        <button onClick={handleDeleteTrackClick}>x</button>
      </div>
      <div className="track-info-right">
        <div className="track-info-title">{name}</div>
        <div className="track-info-buttons">
          <button onClick={handleMuteClick} className="track-info-button">m</button>
          <button onClick={handleSoloClick} className="track-info-button">s</button>
        </div>
      </div>
    </div>
  );
};


function mapStateToProps(state, ownProps) {
  return selectTrack(ownProps.id)(state);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mute, solo, unmute, unsolo, deleteTrack }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackInfo);
