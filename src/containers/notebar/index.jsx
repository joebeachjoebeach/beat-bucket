import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { incrementOctave, decrementOctave } from '../../redux/actions/actions-globals';
import './notebar.css';

import NoteInKeyboard from '../note-in-keyboard';

const Notebar = ({ octave, incrementOctave, decrementOctave }) => {                    
  const left = '‹';
  const right = '›';

  function handleDecrementOctaveClick() {
    if (octave > 1)
      decrementOctave();
  }

  function handleIncrementOctaveClick() {
    if (octave < 8)
      incrementOctave();
  }

  return (                    
    <div className="notebar">                    
      <button onClick={handleDecrementOctaveClick} className="notebar-arrow">{left}</button>
      <div className="notebar-notes">
        <NoteInKeyboard name="rest" styleName="rest" />

        <NoteInKeyboard name={`C#${octave}`} styleName="csharp" />
        <NoteInKeyboard name={`D#${octave}`} styleName="dsharp" />
        <NoteInKeyboard name={`F#${octave}`} styleName="esharp" />
        <NoteInKeyboard name={`G#${octave}`} styleName="fsharp" />
        <NoteInKeyboard name={`A#${octave}`} styleName="gsharp" />
        
        <NoteInKeyboard name={`C${octave}`} styleName="c" />
        <NoteInKeyboard name={`D${octave}`} styleName="d" />
        <NoteInKeyboard name={`E${octave}`} styleName="e" />
        <NoteInKeyboard name={`F${octave}`} styleName="f" />
        <NoteInKeyboard name={`G${octave}`} styleName="g" />
        <NoteInKeyboard name={`A${octave}`} styleName="a" />
        <NoteInKeyboard name={`B${octave}`} styleName="b" />
        <NoteInKeyboard name={`C${octave + 1}`} styleName="c2" />
      </div>
      <button onClick={handleIncrementOctaveClick} className="notebar-arrow">{right}</button>
    </div>
  );                    
};

function mapStateToProps({ globals: { octave } }) {                            
  return { octave };                            
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ incrementOctave, decrementOctave }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notebar);
