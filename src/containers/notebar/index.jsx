import React from 'react';
import { connect } from 'react-redux';                        
import { bindActionCreators } from 'redux';
import { incrementOctave, decrementOctave } from '../../redux/actions/actions-globals';
import { selectOctave } from '../../redux/selectors';
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
        <NoteInKeyboard value="rest" styleName="rest" />

        <NoteInKeyboard value={`C#${octave}`} styleName="csharp" />
        <NoteInKeyboard value={`D#${octave}`} styleName="dsharp" />
        <NoteInKeyboard value={`F#${octave}`} styleName="esharp" />
        <NoteInKeyboard value={`G#${octave}`} styleName="fsharp" />
        <NoteInKeyboard value={`A#${octave}`} styleName="gsharp" />
        
        <NoteInKeyboard value={`C${octave}`} styleName="c" />
        <NoteInKeyboard value={`D${octave}`} styleName="d" />
        <NoteInKeyboard value={`E${octave}`} styleName="e" />
        <NoteInKeyboard value={`F${octave}`} styleName="f" />
        <NoteInKeyboard value={`G${octave}`} styleName="g" />
        <NoteInKeyboard value={`A${octave}`} styleName="a" />
        <NoteInKeyboard value={`B${octave}`} styleName="b" />
        <NoteInKeyboard value={`C${octave + 1}`} styleName="c2" />
      </div>
      <button onClick={handleIncrementOctaveClick} className="notebar-arrow">{right}</button>
    </div>
  );                    
};

function mapStateToProps(state) {                            
  return { octave: selectOctave(state) };                            
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ incrementOctave, decrementOctave }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notebar);
