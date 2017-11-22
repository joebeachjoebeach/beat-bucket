// TRACK

import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../item-types';
import './track.css';

import BucketRow from '../bucket-row';
import Notebar from '../notebar';

const Track = ({ connectDropTarget, name, sequence, currentNote }) => {
  return connectDropTarget(
    <div className="track">
      <div>{name}</div>
      <Notebar />
      <BucketRow sequence={sequence} currentNote={currentNote} />
    </div>
  );
};

const trackTarget = {
  drop() {
    return { target: 'delete' };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function mapStateToProps({ tracks, globals: { currentTrack } }) {
  return tracks[currentTrack];
}

const Track_DT = DropTarget(ItemTypes.BUCKET_NOTE, trackTarget, collect)(Track);

export default connect(mapStateToProps)(Track_DT);
