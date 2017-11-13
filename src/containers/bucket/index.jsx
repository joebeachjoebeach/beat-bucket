// BUCKET

import React from 'react';
import './bucket.css';

const Bucket = ({ notes }) => {

  function renderNotes() {
    return notes.map((note, i) => {
      return <div className="note" key={i}>{note}</div>;
    });
  }

  return (
    <div className="bucket">
      {renderNotes()}
    </div>
  );
};

export default Bucket;
