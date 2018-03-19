// BUCKET-OPTIONS

import React from 'react';
import './bucket-options.css';

import BlankSquare from '../svg/blank-square';
import Clipboard from '../svg/clipboard';
import Copy from '../svg/copy';
import XSquare from '../svg/x-square';

const BucketOptions = (props) => {

  return (
    <div className="bucket-options">

      <button className="bucket-options-item">
        <BlankSquare className="bucket-options-svg" />
        <span>clear</span>
      </button>
      <button className="bucket-options-item">
        <XSquare className="bucket-options-svg" />
        <span>delete</span>
      </button>
      <button className="bucket-options-item">
        <Copy className="bucket-options-svg" />
        <span>copy</span>
      </button>
      <button className="bucket-options-item">
        <Clipboard className="bucket-options-svg" />
        <span>paste</span>
      </button>
    </div>
  );
};

export default BucketOptions;
