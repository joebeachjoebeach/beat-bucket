// NOTE

import React from 'react';
import './note.css';

const Note = ({ value, styleName }) => {                    

  return (
    <div className={`note ${styleName}`}>
      {value}
    </div>
  );                    
};

export default Note;
