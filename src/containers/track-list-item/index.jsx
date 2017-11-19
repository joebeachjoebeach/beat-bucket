// TRACK LIST ITEM

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mute, solo, unmute, unsolo, updateCurrentTrack } from '../../actions';

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
  updateCurrentTrack}) => {

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
      <div className="mutesolo">
        {renderMute()}
        {renderSolo()}
      </div>
    </div>
  );
};


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mute, solo, unmute, unsolo, updateCurrentTrack }, dispatch);
}

export default connect(null, mapDispatchToProps)(TrackListItem);
