// BUCKET-OPTIONS

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteBucket, clearBucket } from '../../redux/actions/actions-sequence';
import './bucket-options.css';

import BlankSquare from '../svg/blank-square';
import Clipboard from '../svg/clipboard';
import Copy from '../svg/copy';
import XSquare from '../svg/x-square';

const BucketOptions = ({
  trackId,
  bucketId,
  hideParentOptions,
  deleteBucket,
  clearBucket }) => {

  function handleDeleteBucketClick() {
    deleteBucket({ trackId, bucketId });
    hideParentOptions();
  }

  function handleClearBucketClick() {
    clearBucket({ trackId, bucketId });
    hideParentOptions();
  }

  return (
    <div className="bucket-options">
      <button className="bucket-options-item">
        <Clipboard className="bucket-options-svg" />
        <span>paste</span>
      </button>
      <button className="bucket-options-item">
        <Copy className="bucket-options-svg" />
        <span>copy</span>
      </button>
      <button
        className="bucket-options-item"
        onClick={handleDeleteBucketClick}
      >
        <XSquare className="bucket-options-svg" />
        <span>delete</span>
      </button>
      <button
        className="bucket-options-item"
        onClick={handleClearBucketClick}
      >
        <BlankSquare className="bucket-options-svg" />
        <span>clear</span>
      </button>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteBucket, clearBucket }, dispatch);
}

export default connect(null, mapDispatchToProps)(BucketOptions);
