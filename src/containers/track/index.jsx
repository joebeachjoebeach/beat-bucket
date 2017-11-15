// TRACK

import React from 'react';
import { connect } from 'react-redux';
import './track.css';

import BucketRow from '../bucket-row';

const Track = ({ name, sequence }) => {
  return (
    <div className="track">
      <div>{name}</div>
      <BucketRow sequence={sequence} />
    </div>
  );
};

function mapStateToProps({ tracks, globals: { currentTrack } }) {
  return tracks[currentTrack];
}

export default connect(mapStateToProps)(Track);
