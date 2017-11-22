// TRACK

import React from 'react';
import { connect } from 'react-redux';
import './track.css';

import BucketRow from '../bucket-row';
import Notebar from '../notebar';

const Track = ({ name, sequence, currentNote }) => {
  return (
    <div className="track">
      <div>{name}</div>
      <Notebar />
      <BucketRow sequence={sequence} currentNote={currentNote} />
    </div>
  );
};

function mapStateToProps({ tracks, globals: { currentTrack } }) {
  return tracks[currentTrack];
}

export default connect(mapStateToProps)(Track);
