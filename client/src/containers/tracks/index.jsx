// TRACKS

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTrack } from '../../redux/actions/actions-tracks';
import { selectTracks } from '../../redux/selectors';
import './tracks.css';

import Track from '../track';

const Tracks = ({ tracks, addTrack }) => {

  function handleNewTrackClick() {
    addTrack();
  }

  function renderTracks() {
    return Object.values(tracks).map(track => {
      return <Track id={track.id} key={track.id} />;
    });
  }

  return (
    <div className="tracks">
      {renderTracks()}
      <button
        onClick={handleNewTrackClick}
        className="tracks-new"
        title="create new track"
      >
        +
      </button>
    </div>
  );
};


function mapStateToProps(state) {
  return { tracks: selectTracks(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTrack }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
