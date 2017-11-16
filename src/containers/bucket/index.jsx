// BUCKET

import React from 'react';
import { connect } from 'react-redux';
import './bucket.css';

const Bucket = ({ notes, currentNote, id: bucketId }) => {

  function renderNotes() {
    return notes.map((note, i) => {
      if (currentNote[0] === bucketId && currentNote[1] === i)
        return <div className="note note-current" key={i} id={i}>{note}</div>;
      else
        return <div className="note" key={i} id={i}>{note}</div>;
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
