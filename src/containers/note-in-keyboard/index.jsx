// NOTE-IN-KEYBOARD

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { addNote } from '../../actions';
import ItemTypes from '../../item-types';
import './note-in-keyboard.css';

import Note from '../note';

const NoteInKeyboard = ({ name, styleName, connectDragSource }) => {                    

  return connectDragSource(
    <div className={`note-in-keyboard ${styleName}`}>
      <Note name={name} styleName={styleName} />
    </div>
  );                    
};

const noteInKeyboardSource = {
  beginDrag(props) {
    return { name: props.name, id: props.nextId };
  },

  isDragging(props, monitor) {
    return monitor.getItem().name === props.name;
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { name, currentTrack, addNote } = props;
      const { target, bucketId } = monitor.getDropResult();
      if (target === 'bucket')
        addNote({ note: name, bucketId, trackId: currentTrack, index: 0 });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function mapStateToProps({ globals: { currentTrack }, tracks }) {                            
  const nextId = tracks[currentTrack].nextId;
  return { currentTrack, nextId };
}                             

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators({ addNote }, dispatch);
}

const NoteInKeyboard_DS = DragSource(ItemTypes.NOTE, noteInKeyboardSource, collect)(NoteInKeyboard);

export default connect(mapStateToProps, mapDispatchToProps)(NoteInKeyboard_DS);
