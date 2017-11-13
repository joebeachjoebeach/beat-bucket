import React from 'react';
import Tone from 'tone';
import { connect } from 'react-redux';
import './transport.css';

const Transport = ({ bpm, tracks }) => {

  function extractNotes(arr, baseNote) {
    const result = [];
    arr.forEach((bucket, bucketIndex) => {
      bucket.forEach((note, noteIndex) => {
        const [ dur, time ] = getDurAndTime(bucket.length, bucketIndex, noteIndex, baseNote);
        result.push({ note, dur, time });
      });
    });
    return result;
  }

  function getDurAndTime(bucketLength, bucketIndex, noteIndex, baseNote) {
    const _dur = baseNote / bucketLength;
    const dur = `0:${_dur}`;
    const start = `0:${bucketIndex}`;
    const time = `${start} + 0:${noteIndex * _dur}`;
    return [dur, time];
  }

  function play() {
    tracks.forEach(track => {
      const synth = new Tone.Synth().toMaster();
      const part = new Tone.Part((time, event) => {
        synth.triggerAttackRelease(event.note, event.dur, time);
      }, extractNotes(track.sequence, track.baseNote));

      part.start(0);

      part.loop = true;
      part.loopEnd = `${track.sequence.length}*0:${track.baseNote}`;

      // const sequence = new Tone.Sequence((time, note) => {
      //   // console.log(time, note);
      //   synth.triggerAttackRelease(note, time);
      // }, track.sequence, convertBaseNote(track.baseNote));

      // sequence.start(0);
      // sequence.loop = true;
      // sequence.loopEnd = `${track.sequence.length}*0:${track.baseNote}`;
      
    });



    Tone.Transport.start('+0.1');
  }

  function convertBaseNote(baseNote) {
    const quarters = (1 / baseNote).toString();
    return `0:${quarters}`;
  }

  // function play() {
  //   tracks.forEach(track => {
  //     const synth = new Tone.Synth().toMaster();
  //     const sequence = new Tone.Sequence((time, note) => {
  //       // console.log(time, note);
  //       synth.triggerAttackRelease(note, time);
  //     }, track.sequence, convertBaseNote(track.baseNote));

  //     sequence.start(0);
  //     sequence.loop = true;
  //     sequence.loopEnd = `${track.sequence.length}*0:${track.baseNote}`;
  //   });

  //   Tone.Transport.start('+0.1');
    
  // }

  function stop() {
    Tone.Transport.stop();
  }

  return (
    <div className="transport">
      <button onClick={stop}>Stop</button>
      <button onClick={play}>Play</button>
    </div>
  );
};

function mapStateToProps({ globals: { bpm }, tracks }) {
  return { bpm, tracks };
}

export default connect(mapStateToProps)(Transport);
