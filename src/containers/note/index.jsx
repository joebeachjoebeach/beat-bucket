// NOTE

import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { DragSource } from 'react-dnd';
import { dropNote, deleteNote } from '../../actions';
import './note.css';

const Note = ({ name, styleName }) => {                    

  return (
    <div className={`note ${styleName}`}>
      {name}
    </div>
  );                    
};

export default Note;
