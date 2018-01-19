// BUCKETROW

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBucket } from '../../redux/actions/actions-sequence';
import { changeBaseNote } from '../../redux/actions/actions-track';
import { selectCurrentTrack, selectBaseNote } from '../../redux/selectors';
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
      return <img className="half" alt="half note" src={halfNote} />;
    case 1:
      return '♩';
    case 0.5:
      return '♪';
    case 0.25:
      return <img className="sixteenth" alt="sixteenth note" src={sixteenthNote} />;
    default:
      return 1;
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

function mapStateToProps(state) {
  const currentTrack = selectCurrentTrack(state);
  return {
    // currentTrack,
    baseNote: selectBaseNote(currentTrack)(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addBucket, changeBaseNote }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketRow);
