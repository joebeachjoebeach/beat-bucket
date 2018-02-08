// NOTE-IN-BUCKET

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import { deleteNote, addNote, moveNote } from '../../redux/actions/actions-sequence';
import ItemTypes from '../../dnd/item-types';

import './note-in-bucket.css';

import Note from '../../components/note';

const NoteInBucket = ({
  value,
  active,
  connectDragSource,
  connectDropTarget,
  isDragging }) => {                    

  const opacity = isDragging ? 0 : 1;

  return connectDragSource(
    connectDropTarget(
      <div className="note-in-bucket" style={{ opacity }}>
        <Note value={value} active={active} />
      </div>
    ));
};

const noteInBucketSource = {
  beginDrag(props) {
    return {
      id: props.id,
      noteIndex: props.index,
      bucketId: props.bucketId,
      trackId: props.trackId,
      value: props.value,
      source: 'bucket'
    };
  },

  isDragging(props, monitor) {
    const { id, trackId } = monitor.getItem();
    return props.id === id && props.trackId === trackId;
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { target } = monitor.getDropResult();

      // if it's dropped in a deletion zone
      if (target === 'delete') {
        const { deleteNote } = props;
        const { bucketId, trackId, noteIndex } = monitor.getItem();
        deleteNote({
          noteIndex,
          bucketId: bucketId,
          trackId: trackId
        });
      }

      // if it's dropped in a bucket
      if (target === 'bucket') {
        // using monitor.getItem() for the source is more reliable than using props
        // because this note may have been dragged through intermediary buckets
        const {
          noteIndex: index,
          id,
          bucketId: bucket,
          value,
          trackId } = monitor.getItem();

        const payload = {
          source: {
            index,
            id,
            bucket,
            value,
            trackId
          },
          target: {
            index: monitor.getDropResult().length,
            bucket: monitor.getDropResult().bucketId,
            trackId: monitor.getDropResult().trackId
          }
        };
        props.moveNote(payload);
      }
    }
  }
};

const noteInBucketTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().noteIndex;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex)
      return;

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
      return;

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      return;

    const item = monitor.getItem();

    // if it's a note from the keyboard
    if (item.source === 'keyboard') {
      props.addNote({
        value: item.value,
        id: props.nextId,
        index: hoverIndex,
        bucketId: props.bucketId,
        trackId: props.trackId
      });
      monitor.getItem().value = item.value;
      monitor.getItem().source = null;
      monitor.getItem().noteIndex = props.index;
      monitor.getItem().bucketId = props.bucketId;
      monitor.getItem().id = props.nextId;
      monitor.getItem().trackId = props.trackId;
      return;
    }

    // otherwise, it's a note from a bucket
    const payload = {
      source: {
        index: dragIndex,
        id: item.id,
        bucket: item.bucketId,
        value: item.value,
        trackId: item.trackId
      },
      target: {
        index: hoverIndex,
        bucket: props.bucketId,
        trackId: props.trackId
      }
    };

    props.moveNote(payload);

    // if we're moving it into another track, then update the note's id & trackId
    if (item.trackId !== props.trackId) {
      monitor.getItem().id = props.nextId;
      monitor.getItem().trackId = props.trackId;
    }

    monitor.getItem().noteIndex = hoverIndex;
    monitor.getItem().bucketId = props.bucketId;
  }
};

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function targetCollect(connect) {
  return { 
    connectDropTarget: connect.dropTarget()
  };
}

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators({ deleteNote, addNote, moveNote }, dispatch);
}

const NoteInBucket_DTDS =  flow([
  DragSource(ItemTypes.NOTE, noteInBucketSource, sourceCollect),
  DropTarget(ItemTypes.NOTE, noteInBucketTarget, targetCollect)
])(NoteInBucket);

export default connect(null, mapDispatchToProps)(NoteInBucket_DTDS);
