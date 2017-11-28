// NOTE-IN-BUCKET

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import flow from 'lodash/flow';
import { deleteNote, dropNote, moveNote } from '../../actions';
import ItemTypes from '../../item-types';

import Note from '../note';

const NoteInBucket = ({ name, styleName, connectDragSource, connectDropTarget, isDragging }) => {                    

  const opacity = isDragging ? 0 : 1;

  return connectDragSource(
    connectDropTarget(
      <div style={{ opacity }}>
        <Note name={name} styleName={styleName} />
      </div>
    ));
};

const noteInBucketSource = {
  beginDrag(props) {
    return {
      id: props.id,
      noteIndex: props.index,
      bucketId: props.bucketId,
      note: props.name
    };
  },

  isDragging(props, monitor) {
    const { id, bucketId } = monitor.getItem();
    return props.id === id && props.bucketId === bucketId;
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { index, bucketId, currentTrack, deleteNote } = props;
      const { target } = monitor.getDropResult();

      if (target === 'delete')
        deleteNote({ noteIndex: index, bucketId: bucketId, trackId: currentTrack });

    }
  }
};

const noteInBucketTarget = {
  // drop() {
  //   return { target: 'note' };
  // },

  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().noteIndex;
    const hoverIndex = props.index;

    // don't replace an item with itself
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

    // const out = {
    //   originalIndex: dragIndex,
    //   newIndex: hoverIndex,
    //   bucketId: props.bucketId,
    //   trackId: props.currentTrack,
    // };

    const item = monitor.getItem();

    const payload = {
      source: {
        index: dragIndex,
        id: item.id,
        bucket: item.bucketId,
        note: item.note
      },
      target: {
        index: hoverIndex,
        bucket: props.bucketId
      },
      track: props.currentTrack
    };

    // props.moveNote(out);
    props.moveNote(payload);

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

function mapStateToProps({ globals: { currentTrack }}) {                            
  return { currentTrack };
}                             

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators({ deleteNote, dropNote, moveNote }, dispatch);
}

const NoteInBucket_DTDS =  flow([
  DragSource(ItemTypes.BUCKET_NOTE, noteInBucketSource, sourceCollect),
  DropTarget(ItemTypes.BUCKET_NOTE, noteInBucketTarget, targetCollect)
])(NoteInBucket);

export default connect(mapStateToProps, mapDispatchToProps)(NoteInBucket_DTDS);
