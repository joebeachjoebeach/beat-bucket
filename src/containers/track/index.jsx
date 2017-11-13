// TRACK

import React from 'react';
import { connect } from 'react-redux';
import Tone from 'tone';
import './track.css';

import BucketRow from '../bucket-row';

const Track = ({ name, sequence, baseNote }) => {
  return (
    <div className="track">
      <div>{name}</div>
      <BucketRow sequence={sequence} />
    </div>
  );
};

function mapStateToProps({ tracks }) {
  const [ { name, sequence, baseNote } ] = tracks;
  return { name, sequence, baseNote };
}

export default connect(mapStateToProps)(Track);
