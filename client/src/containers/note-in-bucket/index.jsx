// NOTE-IN-BUCKET

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import { deleteNote, addNote, moveNote } from '../../redux/actions/actions-sequence';
// import { selectCurrentTrack } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';

import Note from '../../components/note';

const NoteInBucket = ({
  value,
  styleName,
  connectDragSource,
  connectDropTarget,
  isDragging }) => {                    

  const opacity = isDragging ? 0 : 1;

  return connectDragSource(
    connectDropTarget(
      <div style={{ opacity }}>
        <Note value={value} styleName={styleName} />
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
    // if (monitor.getItem().source === null || monitor.getItem().source === 'bucket') {
    //   console.log('item');
    //   console.log(`  id: ${id}`);
    //   console.log(`  trackId: ${trackId}`);

    //   console.log('props');
    //   console.log(`  id: ${props.id}`);
    //   console.log(`  trackId: ${props.trackId}`);
    // }
    return props.id === id && props.trackId === trackId;
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { target } = monitor.getDropResult();

      if (target === 'delete') {
        const { index, bucketId, deleteNote } = props;
        deleteNote({ noteIndex: index, bucketId: bucketId, trackId: props.trackId });
      }

      if (target === 'bucket') {
        // using monitor.getItem() for the source is more reliable than using props
        // because this note may have been dragged through intermediary buckets
        const { noteIndex: index, id, bucketId: bucket, value } = monitor.getItem();
        const payload = {
          source: {
            index,
            id,
            bucket,
            value,
            trackId: props.trackId
          },
          target: {
            index: monitor.getDropResult().length,
            bucket: monitor.getDropResult().bucketId,
            trackId: monitor.getDropResult().trackId
          },
          trackId: props.trackId,
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
      },
      trackId: props.trackId
    };

    props.moveNote(payload);

    monitor.getItem().noteIndex = hoverIndex;
    monitor.getItem().bucketId = props.bucketId;
    monitor.getItem().trackId = props.trackId;
    monitor.getItem().id = props.nextId;

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
