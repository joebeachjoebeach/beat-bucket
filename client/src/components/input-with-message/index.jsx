// INPUT-WITH-MESSAGE

import React from 'react';
import './input-with-message.css';

const InputWithMessage = ({ inputRef, message, ...restProps }) => {

  return (
    <div className="input-with-message">
      <input
        className="input-dark"
        ref={inputRef}
        {...restProps}
      />
      <div className="input-message">{message}</div>
    </div>
  );
};

export default InputWithMessage;
