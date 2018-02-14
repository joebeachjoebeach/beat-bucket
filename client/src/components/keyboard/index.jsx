// KEYBOARD

import React from 'react';
import './keyboard.css';

import NoteInKeyboard from '../note-in-keyboard';


const NaturalOctave = ({ octave }) => {
  const naturals = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  return naturals.map((value, i) => {
    return <NoteInKeyboard value={`${value}${octave}`} key={i} />;
  });
};

const AccidentalOctave = ({ octave }) => {

  const accidentals2 = ['C#', 'D#'];
  const accidentals3 = ['F#', 'G#', 'A#'];

  function renderAccidentals(arr) {
    return (
      <div className={`keyboard-acc${arr.length}`} key={arr.length - 2}>
        {arr.map((value, i) => <NoteInKeyboard value={`${value}${octave}`} key={i} />)}
      </div>
    );
  }

  return [
    renderAccidentals(accidentals2),
    renderAccidentals(accidentals3)
  ];
};

const Keyboard = () => {

  return (
    <div className="keyboard">
      <div className="keyboard-notes">
        <div className="keyboard-col">
          <NaturalOctave octave={2} />
          <NaturalOctave octave={3} />
          <NaturalOctave octave={4} />
          <NaturalOctave octave={5} />
          <NaturalOctave octave={6} />
        </div>
        <div className="keyboard-col">
          <AccidentalOctave octave={2} />
          <AccidentalOctave octave={3} />
          <AccidentalOctave octave={4} />
          <AccidentalOctave octave={5} />
          <AccidentalOctave octave={6} />
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
