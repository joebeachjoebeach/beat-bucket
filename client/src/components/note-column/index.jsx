// NOTE-COLUMN

import React from 'react';
import './note-column.css';

import Keyboard from '../keyboard';
import NoteInKeyboard from '../../containers/note-in-keyboard';

const NoteColumn = (props) => {

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
