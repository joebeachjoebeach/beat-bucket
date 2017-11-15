// BUCKETROW

import React from 'react';
import './bucket-row.css';

import Bucket from '../bucket';

const BucketRow = ({ sequence }) => {

  function renderBuckets() {
    return sequence.map((bucket, i) => {
      return <Bucket notes={bucket} key={i} id={i} />;
    });
  }

  return (
    <div className="bucketrow">
      {renderBuckets()}
    </div>
  );
};

export default BucketRow;
