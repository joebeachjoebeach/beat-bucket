// BUCKET

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../dnd/item-types';
import { deleteBucket } from '../../redux/actions/actions-sequence';
import { selectNextId } from '../../redux/selectors';
import './bucket.css';

import NoteInBucket from '../note-in-bucket';

const Bucket = ({ notes, currentNote, bucketId, trackId, nextId, connectDropTarget }) => {

  function renderNotes() {
    return notes.map((note, i) => {
      let active = currentNote[0] === bucketId && currentNote[1] === i;

      return (
        <NoteInBucket
          value={note.value}
          active={active}
          index={i}
          key={i}
          id={note.id}
          bucketId={bucketId}
          trackId={trackId}
          nextId={nextId}
        />
      );
    });
  }

  let styleName = currentNote[0] === bucketId
    ? 'bucket bucket-playing'
    : 'bucket';

  return connectDropTarget(
    <div className={styleName}>
      {renderNotes()}
    </div>
  );
};

const bucketTarget = {
  drop(props, monitor) {
    if (monitor.didDrop())
      return;
    return {
      target: 'bucket',
      bucketId: props.bucketId,
      trackId: props.trackId,
      nextId: props.nextId,
      length: props.notes.length
    };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps(state, ownProps) {
  return { nextId: selectNextId(ownProps.trackId)(state) };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteBucket }, dispatch);
}

const dt_Bucket = DropTarget(ItemTypes.NOTE, bucketTarget, collect)(Bucket);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Bucket);
