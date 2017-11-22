// NOTE-IN-BUCKET

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { deleteNote } from '../../actions';
import ItemTypes from '../../item-types';
import './note-in-bucket.css';

import Note from '../note';

const NoteInBucket = ({ name, styleName, connectDragSource }) => {                    

  return connectDragSource(
    <div className={`note-in-bucket ${styleName}`}>
      <Note name={name} styleName={styleName} />
    </div>
  );                    
};

const noteInBucketSource = {
  beginDrag(props) {
    return { name: props.name };
  },

  isDragging(props, monitor) {
    return monitor.getItem().name === props.name;
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { id, bucketId, currentTrack, deleteNote } = props;
      deleteNote({ noteIndex: id, bucketId: bucketId, trackId: currentTrack });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function mapStateToProps({ globals: { currentTrack }}) {                            
  return { currentTrack };
}                             

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators({ deleteNote }, dispatch);
}

const NoteInBucket_DS = DragSource(ItemTypes.BUCKET_NOTE, noteInBucketSource, collect)(NoteInBucket);

export default connect(mapStateToProps, mapDispatchToProps)(NoteInBucket_DS);
