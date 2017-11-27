// TRACK

import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../item-types';
import './track.css';

import BucketRow from '../bucket-row';
import Notebar from '../notebar';
import Sortable from '../../components/sortable';

const Track = ({ connectDropTarget, isOver, name, sequence, currentNote }) => {
  const styleName = isOver ? 'track hover' : 'track';

  return connectDropTarget(
    <div className={styleName}>
      <div>{name}</div>
      <Notebar />
      <BucketRow sequence={sequence} currentNote={currentNote} />
      <Sortable />
    </div>
  );
};

const trackTarget = {
  drop(props, monitor) {
    // if the item has been dropped on a child target, then we don't want to do anything
    if (monitor.didDrop())
      return;
    return { target: 'delete' };
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true })
  };
}

function mapStateToProps({ tracks, globals: { currentTrack } }) {
  return tracks[currentTrack];
}

const Track_DT = DropTarget(ItemTypes.BUCKET_NOTE, trackTarget, collect)(Track);

export default connect(mapStateToProps)(Track_DT);
