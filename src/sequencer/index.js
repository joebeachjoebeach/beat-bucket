import Tone from 'tone';

export function playSequence(tracks, callback) {
  tracks.forEach(({ sequence, baseNote }) => {
    const part = new Tone.Part(partProcessor(callback), extractNotes(sequence, baseNote));

    part.start(0);
    part.loop = true;
    part.loopEnd = `${sequence.length}*0:${baseNote}`;
  });

  Tone.Transport.start('+0.1');
}

function partProcessor(callback) {
  const synth = new Tone.Synth().toMaster();

  return (time, event) => {
    synth.triggerAttackRelease(event.note, event.dur, time);
    callback(time, event);
  };
  
}

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



function stop() {
  Tone.Transport.stop();
}
















/* ********* *
SEQUENCE CODE ******************************************
* ********** */

// function convertBaseNote(baseNote) {
//   const quarters = (1 / baseNote).toString();
//   return `0:${quarters}`;
// }

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

