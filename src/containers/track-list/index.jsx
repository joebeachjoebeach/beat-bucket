// TRACK LIST

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTrack } from '../../actions';

import './track-list.css';

import TrackListItem from '../track-list-item';

const TrackList = ({ tracks, currentTrack, addTrack }) => {

  function handleNewTrackClick() {
    addTrack();
  }

  function renderTrackList() {
    return Object.values(tracks).map(({ muted, soloed, name, id }) => {
      const current = id === currentTrack;
      return <TrackListItem
        name={name}
        muted={muted}
        soloed={soloed}
        current={current}
        id={id}
        key={id}
      />;
    });
  }

  return (
    <div className="tracklist">
      {renderTrackList()}
      <button onClick={handleNewTrackClick}>New Track</button>
    </div>
  );
  
};

function mapStateToProps({ tracks, globals: { currentTrack }}) {
  return { tracks, currentTrack };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTrack }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);
