// NOTE-COLUMN

import React from 'react';
import './note-column.css';

import Keyboard from '../keyboard';
import NoteInKeyboard from '../note-in-keyboard';

const NoteColumn = () => {

  return (
    <div className="note-column">
      <div className="rest-box">
        <NoteInKeyboard value="rest" />
      </div>
      <Keyboard />
    </div>
  );
};

export default NoteColumn;
