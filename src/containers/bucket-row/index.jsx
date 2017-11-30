// BUCKETROW

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBucket, changeBaseNote } from '../../actions';
import halfNote from './half.svg';
import sixteenthNote from './sixteenth.svg';
import './bucket-row.css';

import Bucket from '../bucket';

const BucketRow = ({
  sequence,
  currentNote,
  currentTrack,
  addBucket,
  baseNote,
  changeBaseNote }) => {

  function handleAddBucketClick() {
    addBucket({ trackId: currentTrack });
  }

  function handleBaseNoteClick() {
    const payload = baseNote <= 0.25 ? 2 : baseNote / 2;
    changeBaseNote({ baseNote: payload, trackId: currentTrack });
  }

  function renderNoteSymbol() {
    switch (baseNote) {
    case 2:
      return <img className="half" src={halfNote} />;
    case 1:
      return '♩';
    case 0.5:
      return '♪';
    case 0.25:
      return <img className="sixteenth" src={sixteenthNote} />;
    }
  }

  function renderBuckets() {
    return sequence.map((bucket, i) => {
      return <Bucket notes={bucket} currentNote={currentNote} key={i} bucketId={i} />;
    });
  }

  return (
    <div className="bucketrow">
      <button onClick={handleBaseNoteClick} className="bucketrow-button">{renderNoteSymbol()}</button>
      {renderBuckets()}
      <button onClick={handleAddBucketClick} className="bucketrow-button">+</button>
    </div>
  );
};

function mapStateToProps({ tracks, globals: { currentTrack }}) {
  const baseNote = tracks[currentTrack].baseNote;
  return { currentTrack, baseNote };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addBucket, changeBaseNote }, dispatch);
}

// export default BucketRow;
export default connect(mapStateToProps, mapDispatchToProps)(BucketRow);
