// SIDEBAR

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCurrentTrack } from '../../actions';
import './sidebar.css';

import Transport from '../transport';
import TrackList from '../track-list';

const Sidebar = ({ tracks, updateCurrentTrack, currentTrack }) => {
  function renderTrackNames() {
    return tracks.map(({ name, id }) => {
      return (
        <div
          className="tracklist-name"
          key={id}
          onClick={onTrackClick(id)}
        >
          {name}
        </div>
      );
    });
  }

  function onTrackClick(trackId) {
    return () => {
      if (trackId !== currentTrack)
        updateCurrentTrack(trackId);
    };
  }

  // return (
  //   <div className="sidebar">
  //     <Transport />
  //     <div className="tracklist">
  //       {renderTrackNames()}
  //     </div>
  //   </div>
  // );

  return (
    <div className="sidebar">
      <Transport />
      <TrackList />
    </div>
  );

};

function mapStateToProps({ tracks, globals: { currentTrack } }) {
  const trackNamesIds = Object.values(tracks).map(({ name, id }) => {
    return { name, id };
  });

  return { tracks: trackNamesIds, currentTrack };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateCurrentTrack }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
