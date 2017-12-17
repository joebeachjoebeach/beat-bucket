// BUCKETHEADER
import React from 'react';
import './bucket-header.css';


const BucketHeader = () => {
  return (
    <header className="bucketheader">
      <div className="bucketheader-title">
        Bucket Name
      </div>
      <button className="bucketheader-button">Save</button>
    </header>
  );
};

export default BucketHeader;
