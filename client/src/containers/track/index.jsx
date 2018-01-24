// TRACK

import React from 'react';
import { connect } from 'react-redux';
import { selectTrack } from '../../redux/selectors';

import './track.css';

import TrackInfo from '../track-info';
import BucketRow from '../bucket-row';

const Track = ({ currentNote, sequence, name, id }) => {

  return (
    <div className="track">
      <TrackInfo id={id} />
      <BucketRow
        sequence={sequence}
        currentNote={currentNote}
      />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return selectTrack(ownProps.id)(state);
}

export default connect(mapStateToProps)(Track);
