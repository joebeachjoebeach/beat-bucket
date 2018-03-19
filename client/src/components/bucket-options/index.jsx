// BUCKET-OPTIONS

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteBucket, clearBucket } from '../../redux/actions/actions-sequence';
import { copyBucket, pasteBucket } from '../../redux/actions/actions-clipboard';
import { selectClipboard } from '../../redux/selectors';
import './bucket-options.css';

import BlankSquare from '../svg/blank-square';
import Clipboard from '../svg/clipboard';
import Copy from '../svg/copy';
import XSquare from '../svg/x-square';

const BucketOptions = ({
  trackId,
  bucketId,
  notes,
  hideParentOptions,
  clipboard,
  deleteBucket,
  clearBucket,
  copyBucket,
  pasteBucket }) => {

  function handleDeleteBucketClick() {
    deleteBucket({ trackId, bucketId });
    hideParentOptions();
  }

  function handleClearBucketClick() {
    clearBucket({ trackId, bucketId });
    hideParentOptions();
  }

  function handleCopyBucketClick() {
    copyBucket(notes);
    hideParentOptions();
  }

  function handlePasteBucketClick() {
    pasteBucket({ trackId, bucketId, notes: clipboard });
    hideParentOptions();
  }

  return (
    <div className="bucket-options">
      <button
        className="bucket-options-item"
        onClick={handlePasteBucketClick}
      >
        <Clipboard className="bucket-options-svg" />
        <span>paste</span>
      </button>
      <button
        className="bucket-options-item"
        onClick={handleCopyBucketClick}
      >
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

function mapStateToProps(state) {
  return { clipboard: selectClipboard(state) };
}

function mapDispatchToProps(dispatch) {
  const actions = { deleteBucket, clearBucket, copyBucket, pasteBucket };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BucketOptions);
