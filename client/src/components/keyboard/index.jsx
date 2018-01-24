// KEYBOARD

import React from 'react';
import './keyboard.css';

import NoteInKeyboard from '../../containers/note-in-keyboard';

const naturals = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const accidentals2 = ['C#', 'D#'];
const accidentals3 = ['F#', 'G#', 'A#'];


class Keyboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { octave: 3 };
  }

  renderNaturals(octave) {
    return naturals.map((value, i) => {
      return <NoteInKeyboard value={`${value}${octave}`} key={i} />;
    });
  }

  renderAccidentals(octave) {
    return (
      <div className="keyboard-col">
        <div className="keyboard-acc2">
          <NoteInKeyboard value="C#" />
          <NoteInKeyboard value="D#" />
        </div>
        <div className="keyboard-acc3">
          <NoteInKeyboard value="F#" />
          <NoteInKeyboard value="G#" />
          <NoteInKeyboard value="A#" />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="keyboard">
        <div className="keyboard-notes">
          <div className="keyboard-col">
            {this.renderNaturals(this.state.octave)}
            {this.renderNaturals(this.state.octave + 1)}
            {this.renderNaturals(this.state.octave + 2)}
          </div>
          {this.renderAccidentals(this.state.octave)}
        </div>
      </div>
    );
  }
}

export default Keyboard;
