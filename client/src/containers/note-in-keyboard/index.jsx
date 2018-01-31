// NOTE-IN-KEYBOARD

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { addNote, moveNote } from '../../redux/actions/actions-sequence';
import { updateTestNote } from '../../redux/actions/actions-globals';
import { selectTestNote } from '../../redux/selectors';
import ItemTypes from '../../dnd/item-types';
import './note-in-keyboard.css';

import Note from '../../components/note';

const NoteInKeyboard = ({
  value,
  styleName,
  updateTestNote,
  connectDragSource }) => {

  function testNoteOn() {
    updateTestNote({ on: true, value });
  }

  function testNoteOff() {
    updateTestNote({ on: false, value });
  }

  return connectDragSource(
    <div
      className={`note-in-keyboard ${styleName}`}
      onMouseDown={testNoteOn}
      onMouseUp={testNoteOff}
      onDragStart={testNoteOff}
    >
      <Note value={value} styleName={styleName} />
    </div>
  );                    
};

// drag source spec function
const noteInKeyboardSource = {
  beginDrag(props) {
    return {
      value: props.value,
      source: 'keyboard'
    };
  },

  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      const { value, addNote, moveNote } = props;
      const { target, bucketId, trackId, nextId, length } = monitor.getDropResult();

      // if it's dropped in a bucket
      if (target === 'bucket') {
        const item = monitor.getItem();

        // if it's being dragged directly from the keyboard, drop it in the bucket
        if (item.source === 'keyboard') {
          addNote({
            value,
            bucketId,
            trackId,
            index: length,
            id: nextId
          });
        }

        // but if it's been hovering in another bucket, then dragged here,
        // move it from one bucket to the other
        else {
          const payload = {
            source: {
              index: item.noteIndex,
              id: item.id,
              bucket: item.bucketId,
              value: item.value,
              trackId: item.trackId
            },
            target: {
              index: length,
              bucket: bucketId,
              trackId: trackId
            }
          };
          moveNote(payload);
        }
      }
    }
  }
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource()
  };
}

function mapStateToProps(state) {
  return { testNote: selectTestNote(state) };
}

function mapDispatchToProps(dispatch) {                            
  return bindActionCreators({ addNote, moveNote, updateTestNote }, dispatch);
}

const NoteInKeyboard_DS = DragSource(
  ItemTypes.NOTE,
  noteInKeyboardSource,
  collect
)(NoteInKeyboard);

export default connect(mapStateToProps, mapDispatchToProps)(NoteInKeyboard_DS);
