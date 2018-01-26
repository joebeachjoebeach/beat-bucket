// TRACKS

import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { selectTracks } from '../../redux/selectors';
import './tracks.css';

import Track from '../track';

const Tracks = ({ tracks }) => {

  function renderTracks() {
    return Object.values(tracks).map(track => {
      return <Track id={track.id} key={track.id} />;
    });
  }

  return (
    <div className="tracks">
      {renderTracks()}
    </div>
  );
};


function mapStateToProps(state) {
  return { tracks: selectTracks(state) };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(_, dispatch);
// }

export default connect(mapStateToProps)(Tracks);
