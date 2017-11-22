import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import './notebar.css';

import NoteInKeyboard from '../note-in-keyboard';

const Notebar = ({ octave }) => {                    
  const left = '<';
  const right = '>';

  return (                    
    <div className="notebar">                    
      <div>{left}</div>
      <div className="notebar-notes">
        <NoteInKeyboard name="C#4" styleName="csharp" />
        <NoteInKeyboard name="D#4" styleName="dsharp" />
        <NoteInKeyboard name="F#4" styleName="esharp" />
        <NoteInKeyboard name="G#4" styleName="fsharp" />
        <NoteInKeyboard name="A#4" styleName="gsharp" />
        
        <NoteInKeyboard name="C4" styleName="c" />
        <NoteInKeyboard name="D4" styleName="d" />
        <NoteInKeyboard name="E4" styleName="e" />
        <NoteInKeyboard name="F4" styleName="f" />
        <NoteInKeyboard name="G4" styleName="g" />
        <NoteInKeyboard name="A4" styleName="a" />
        <NoteInKeyboard name="B4" styleName="b" />
        <NoteInKeyboard name="C5" styleName="c2" />
      </div>
      <div>{right}</div>
    </div>
  );                    
};

function mapStateToProps({ globals: { octave } }) {                            
  return { octave };                            
}                             

// function mapDispatchToProps(dispatch) {                            
//   return bindActionCreators(_, dispatch);                            
// }

export default connect(mapStateToProps)(Notebar);
