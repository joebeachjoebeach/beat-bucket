// NOTE

import React from 'react';
import './note.css';

function intFromNote(note) {
  let output = note.charCodeAt();
  if (note === 'A' || note === 'B')
    output += 7;
  output -= 66;
  return output;
}

function generateColor(noteValue) {
  if (noteValue === 'rest')
    return 'rgba(0, 0, 0, 0.3)';

  const octaveColors = {
    2: [50, 60, 120],
    3: [70, 50, 100],
    4: [100, 40, 70],
    5: [120, 30, 10],
    6: [170, 50, 0]
  };

  const note = intFromNote(noteValue[0]);
  const octave = noteValue[noteValue.length - 1];
  const color = octaveColors[octave].map(colorValue => colorValue + (note * 10));

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function hashToSharp(noteValue) {
  if (noteValue.length === 3)
    return noteValue.replace('#', '♯');
  return noteValue;
}

const Note = ({ value, active }) => {                    

  let color = '#F4A53F';

  if (!active)
    color = generateColor(value);

  return (
    <div className="note" style={{backgroundColor: color}}>
      {hashToSharp(value)}
    </div>
  );                    
};


export default Note;
