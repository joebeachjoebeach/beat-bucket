// BUCKET

import React from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../item-types';
import './bucket.css';

import NoteInBucket from '../note-in-bucket';

const Bucket = ({ connectDropTarget, notes, currentNote, bucketId }) => {

  function renderNotes() {
    return notes.map((note, i) => {
      let styleName = '';
      if (currentNote[0] === bucketId && currentNote[1] === i)
        styleName = 'note-current';

      return (
        <NoteInBucket name={note} styleName={styleName} key={i} id={i} bucketId={bucketId} />
      );
    });
  }

  return connectDropTarget(
    <div className="bucket">
      {renderNotes()}
    </div>
  );
};

const bucketTarget = {
  drop(props, monitor) {
    if (monitor.didDrop())
      return;
    return { target: props.bucketId };
  }
};

/*
    if (monitor.didDrop())
      return;
    return { target: 'delete' };
    */

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps({ tracks }) {
  return { tracks };
}

const dt_Bucket = DropTarget([ItemTypes.KEYBOARD_NOTE, ItemTypes.BUCKET_NOTE], bucketTarget, collect)(Bucket);

export default connect(mapStateToProps)(dt_Bucket);
