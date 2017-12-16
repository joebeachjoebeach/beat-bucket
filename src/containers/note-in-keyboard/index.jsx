// NOTE-IN-KEYBOARD

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { addNote, moveNote } from '../../redux/actions/actions-sequence';
import { selectCurrentTrack, selectTracks, selectNextId } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';
import './note-in-keyboard.css';

import Note from '../../components/note';

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
      const { name, currentTrack, addNote, moveNote } = props;
      const { target, bucketId, length } = monitor.getDropResult();
      if (target === 'bucket') {
        const item = monitor.getItem();
        // if it's being dragged directly from the keyboard, drop it in the bucket
        if (item.name)
          addNote({ note: name, bucketId, trackId: currentTrack, index: length });
        // but if it's been hovering in another bucket, then dragged here,
        // move it from one bucket to the other
        else {
          const payload = {
            source: {
              index: item.noteIndex,
              id: item.id,
              bucket: item.bucketId,
              note: item.note
            },
            target: {
              index: length,
              bucket: bucketId
            },
            track: currentTrack
          };
          moveNote(payload);
        }
      }
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

// function mapStateToProps({ globals: { currentTrack }, tracks }) {                            
//   const nextId = tracks[currentTrack].nextId;
//   return { currentTrack, nextId };
// }

function mapStateToProps(state) {                            
  const currentTrack = selectCurrentTrack(state);
  return {
    currentTrack,
    tracks: selectTracks(state),
    nextId: selectNextId(currentTrack)(state)
  };
}

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators({ addNote, moveNote }, dispatch);
}

const NoteInKeyboard_DS = DragSource(ItemTypes.NOTE, noteInKeyboardSource, collect)(NoteInKeyboard);

export default connect(mapStateToProps, mapDispatchToProps)(NoteInKeyboard_DS);
