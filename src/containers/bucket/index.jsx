// BUCKET

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../dnd/item-types';
import { deleteBucket } from '../../redux/actions/actions-sequence';
import './bucket.css';

import NoteInBucket from '../note-in-bucket';

const Bucket = ({ connectDropTarget, notes, currentNote, currentTrack, bucketId, deleteBucket }) => {

  function handleDeleteBucketClick() {
    deleteBucket({ trackId: currentTrack, bucketId });
  }

  function renderNotes() {
    return notes.map((note, i) => {
      let styleName = '';
      if (currentNote[0] === bucketId && currentNote[1] === i)
        styleName = 'note-current';

      return (
        <NoteInBucket
          name={note.value}
          styleName={styleName}
          index={i}
          key={i}
          id={note.id}
          bucketId={bucketId}
        />
      );
    });
  }

  return connectDropTarget(
    <div className="bucket-container">
      <div className="bucket">
        {renderNotes()}
      </div>
      <button onClick={handleDeleteBucketClick} className="deletebucket">
        delete
      </button>
    </div>
  );
};

const bucketTarget = {
  drop(props, monitor) {
    if (monitor.didDrop())
      return;
    return { target: 'bucket', bucketId: props.bucketId, length: props.notes.length };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps({ tracks, globals: { currentTrack } }) {
  return { tracks, currentTrack };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteBucket }, dispatch);
}

const dt_Bucket = DropTarget(ItemTypes.NOTE, bucketTarget, collect)(Bucket);

export default connect(mapStateToProps, mapDispatchToProps)(dt_Bucket);
