// TRACK LIST ITEM

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMute, toggleSolo, updateCurrentTrack } from '../../actions';

import './track-list-item.css';

const TrackListItem = ({
  current,
  id,
  muted,
  name,
  soloed,
  toggleMute,
  toggleSolo,
  updateCurrentTrack }) => {

  function handleNameClick() {
    if (!current)
      updateCurrentTrack(id);
  }

  function handleMuteClick() {
    toggleMute(id);
  }

  function handleSoloClick() {
    toggleSolo(id);
  }

  function renderCurrent() {
    return <div className="tracklistitem-section current" onClick={handleNameClick}>{name}</div>;
  }

  function renderNormal() {
    return <div className="tracklistitem-section" onClick={handleNameClick}>{name}</div>;
  }

  function renderMuted() {
    return <div className="tracklistitem-section-mutesolo activated" onClick={handleMuteClick}>Mute</div>;
  }

  function renderUnmuted() {
    return <div className="tracklistitem-section-mutesolo" onClick={handleMuteClick}>Mute</div>;
  }

  function renderSoloed() {
    return <div className="tracklistitem-section-mutesolo activated" onClick={handleSoloClick}>Solo</div>;
  }

  function renderUnsoloed() {
    return <div className="tracklistitem-section-mutesolo" onClick={handleSoloClick}>Solo</div>;
  }

  return (
    <div className="tracklistitem">
      {current && renderCurrent()}
      {!current && renderNormal()}
      <div className="tracklistitem-section">
        {muted && renderMuted()}
        {!muted && renderUnmuted()}
        {soloed && renderSoloed()}
        {!soloed && renderUnsoloed()}
      </div>
    </div>
  );
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleMute, toggleSolo, updateCurrentTrack }, dispatch);
}

export default connect(null, mapDispatchToProps)(TrackListItem);
