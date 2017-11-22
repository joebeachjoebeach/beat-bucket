// BUCKET

import React from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { DropTarget } from 'react-dnd';
import './bucket.css';

import Note from '../note';

const Bucket = ({ connectDropTarget, notes, currentNote, bucketId }) => {

  function renderNotes() {
    return notes.map((note, i) => {
      let styleName = '';
      if (currentNote[0] === bucketId && currentNote[1] === i)
        styleName = 'note-current';

      return (
        <Note name={note} styleName={styleName} key={i} id={i} />
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
  drop(props) {
    return { target: props.bucketId };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps({ tracks }) {
  return { tracks };
}

const dt_Bucket = DropTarget('note', bucketTarget, collect)(Bucket);

export default connect(mapStateToProps)(dt_Bucket);
