// NOTE

import React from 'react';
import './note.css';

const Note = ({ name, styleName }) => {                    

  return (
    <div className={`note ${styleName}`}>
      {name}
    </div>
  );                    
};

export default Note;
