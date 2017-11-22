// BUCKETROW

import React from 'react';
import './bucket-row.css';

import Bucket from '../bucket';

const BucketRow = ({ sequence, currentNote }) => {

  function renderBuckets() {
    return sequence.map((bucket, i) => {
      return <Bucket notes={bucket} currentNote={currentNote} key={i} bucketId={i} />;
    });
  }

  return (
    <div className="bucketrow">
      {renderBuckets()}
    </div>
  );
};

export default BucketRow;
