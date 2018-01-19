// TRACK

import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { selectCurrentTrackData } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';

import './track.css';

import BucketRow from '../bucket-row';
import Notebar from '../notebar';

const Track = ({ connectDropTarget, isOver, dragItem, name, sequence, currentNote }) => {

  // add a red backgorund to the track when dragging a note from a bucket
  // to signal that it will be deleted if dropped
  const styleName = (isOver && dragItem.source === 'bucket')
    ? 'track hover'
    : 'track';

  return connectDropTarget(
    <div className={styleName}>
      <div className="track-title">{name}</div>
      <Notebar />
      <BucketRow sequence={sequence} currentNote={currentNote} />
    </div>
  );
};

const trackTarget = {
  drop(props, monitor) {
    // if the item has been dropped on a child target, then we don't want to do anything
    if (monitor.didDrop())
      return;
    return { target: 'delete' };
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    dragItem: monitor.getItem()
  };
}

function mapStateToProps(state) {
  return selectCurrentTrackData(state);
}

const Track_DT = DropTarget(ItemTypes.NOTE, trackTarget, collect)(Track);

export default connect(mapStateToProps)(Track_DT);
