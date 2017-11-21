// BUCKET

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DragSource } from 'react-dnd';

import './bucket.css';

import Note from '../note';

const Bucket = ({ notes, currentNote, id: bucketId }) => {

  function renderNotes() {
    return notes.map((note, i) => {
      let styleName = '';
      if (currentNote[0] === bucketId && currentNote[1] === i)
        styleName = 'note-current';

      return <Note name={note} styleName={styleName} key={i} id={i} />;
    });
  }

  return (
    <div className="bucket">
      {renderNotes()}
    </div>
  );
};

function mapStateToProps({ tracks }) {
  return { tracks };
}

export default connect(mapStateToProps)(Bucket);
