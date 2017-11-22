// BUCKETROW

import React from 'react';
import { DropTarget } from 'react-dnd';
import './bucket-row.css';

import Bucket from '../bucket';

const BucketRow = ({ connectDropTarget, sequence, currentNote }) => {

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

const bucketRowTarget = {
  drop() {
    return { target: 'delete' };
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


export default BucketRow;
// export default DropTarget('note', bucketRowTarget, collect)(BucketRow);
