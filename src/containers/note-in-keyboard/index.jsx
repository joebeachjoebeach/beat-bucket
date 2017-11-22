// NOTE-IN-KEYBOARD

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { dropNote } from '../../actions';
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
    return { name: props.name };
  },

  isDragging(props, monitor) {
    return monitor.getItem().name === props.name;
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { name, currentTrack, dropNote } = props;
      const { target } = monitor.getDropResult();
      dropNote({ note: name, bucketId: target, trackId: currentTrack });
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
  return bindActionCreators({ dropNote }, dispatch);
}

const NoteInKeyboard_DS = DragSource('note', noteInKeyboardSource, collect)(NoteInKeyboard);

export default connect(mapStateToProps, mapDispatchToProps)(NoteInKeyboard_DS);
