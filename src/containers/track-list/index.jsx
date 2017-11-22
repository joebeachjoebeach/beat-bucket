// TRACK LIST

import React from 'react';
import { connect } from 'react-redux';

import './track-list.css';

import TrackListItem from '../track-list-item';

const TrackList = ({ tracks, currentTrack }) => {

  // console.log(tracks);

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
    </div>
  );
  
};

function mapStateToProps({ tracks, globals: { currentTrack }}) {
  return { tracks, currentTrack };
}

export default connect(mapStateToProps)(TrackList);
