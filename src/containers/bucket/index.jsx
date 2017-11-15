// BUCKET

import React from 'react';
import { connect } from 'react-redux';
import './bucket.css';

const Bucket = ({ notes, id: bucketId, currentBucket, currentNote }) => {

  function renderNotes() {
    return notes.map((note, i) => {
      if (currentBucket === bucketId && currentNote === i)
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

function mapStateToProps({ globals: { currentNote }}) {
  const [ bucket, note ] = currentNote;
  return { currentBucket: bucket, currentNote: note };
}

export default connect(mapStateToProps)(Bucket);
