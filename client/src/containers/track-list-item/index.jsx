// TRACK LIST ITEM

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  mute,
  solo,
  unmute,
  unsolo,
} from '../../redux/actions/actions-track';
import { updateCurrentTrack } from '../../redux/actions/actions-globals';
import { deleteTrack } from '../../redux/actions/actions-tracks';
import { selectTracks } from '../../redux/selectors';

import './track-list-item.css';

const TrackListItem = ({
  current,
  id,
  muted,
  name,
  soloed,
  mute,
  solo,
  unmute,
  unsolo,
  updateCurrentTrack,
  deleteTrack,
  tracks }) => {

  function handleNameClick() {
    !current &&
      updateCurrentTrack(id);
  }

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
    const trackKeys = Object.keys(tracks);
    if (trackKeys.length > 1) {
      deleteTrack({ trackId: id });
      trackKeys.splice(trackKeys.indexOf(id.toString()), 1);
      updateCurrentTrack(Math.min.apply(null, trackKeys));
    }
  }

  function renderTrackName() {
    let cName = 'tracklistitem-button trackname' + (current ? ' trackname-active' : '');
    return <button className={cName} onClick={handleNameClick}>{name}</button>;
  }

  function renderMute() {
    let cName = 'tracklistitem-button mutesolo-button' + (muted ? ' mutesolo-button-active' : '');
    return <button aria-label="mute" className={cName} onClick={handleMuteClick}>m</button>;
  }

  function renderSolo() {
    let cName = 'tracklistitem-button mutesolo-button' + (soloed ? ' mutesolo-button-active' : '');
    return <button aria-label="solo" className={cName} onClick={handleSoloClick}>s</button>;
  }

  return (
    <div className="tracklistitem">
      {renderTrackName()}
      <button onClick={handleDeleteTrackClick} >delete</button>
      <div className="mutesolo">
        {renderMute()}
        {renderSolo()}
      </div>
    </div>
  );
};


function mapStateToProps(state) {
  return { tracks: selectTracks(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { mute, solo, unmute, unsolo, updateCurrentTrack, deleteTrack },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackListItem);
