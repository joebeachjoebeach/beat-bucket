// BUCKETROW

import React from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../../item-types';
import './bucket-row.css';

import Bucket from '../bucket';

const BucketRow = ({ connectDropTarget, sequence, currentNote }) => {

  function renderBuckets() {
    return sequence.map((bucket, i) => {
      return <Bucket notes={bucket} currentNote={currentNote} key={i} bucketId={i} />;
    });
  }

  return connectDropTarget(
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

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


// export default BucketRow;
export default DropTarget(ItemTypes.BUCKET_NOTE, bucketRowTarget, collect)(BucketRow);
