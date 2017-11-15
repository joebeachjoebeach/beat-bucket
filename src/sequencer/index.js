import Tone from 'tone';

export default class Sequencer {
  constructor(store) {
    this.store = store;
    this.unsubscribePlaying = this.observeStore(store, this.selectPlaying, this.onPlayingChange);
  }

  // function to subscribe to a specific part of the store and respond with an onChange function
  observeStore(store, select, onChange) {
    let currentState;

    const handleChange = () => {
      let newState = select(store.getState());
      if (newState !== currentState) {
        currentState = newState;
        // onChange(currentState);
        onChange.bind(this)(currentState);
      }
    };

    let unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
  }

  selectPlaying(state) {
    return state.globals.playing;
  }

  selectTracks(state) {
    return state.tracks;
  }

  onPlayingChange(playing) {
    if (playing === false)
      this.stop();
    else
      this.playSequence(this.selectTracks(this.store.getState()), this.updateCurrentNote);
  } 

  updateCurrentNote({ bucketIndex, noteIndex, trackId }) {
    // console.log(note);
    console.log(`bucket: ${bucketIndex}`);
    console.log(`note: ${noteIndex}`);
    console.log(`track: ${trackId}`);
  }


  playSequence(tracks, callback) {
    tracks.forEach(track => {
      const part = new Tone.Part(
        this.partProcessor(callback),
        this.extractNotes(track)
      );

      const { sequence, baseNote } = track;
      part.start(0);
      part.loop = true;
      part.loopEnd = `${sequence.length}*0:${baseNote}`;
    });

    Tone.Transport.start('+0.1');
  }

  partProcessor(callback) {
    const synth = new Tone.Synth().toMaster();

    return (time, event) => {
      synth.triggerAttackRelease(event.note, event.dur, time);

      // now we can access event.bucketIndex, .noteIndex, and .trackId
      callback(event);
    };
    
  }

  // have this add { bucketId, noteId } so that they can be sent to globals "current note"?
  // but we need to keep track of current track too...
  extractNotes({ sequence, id: trackId, baseNote }) {
    const result = [];
    sequence.forEach((bucket, bucketIndex) => {
      bucket.forEach((note, noteIndex) => {
        const [ dur, time ] = this.getDurAndTime(bucket.length, bucketIndex, noteIndex, baseNote);
        result.push({ note, dur, time, bucketIndex, noteIndex, trackId });
      });
    });
    return result;
  }

  getDurAndTime(bucketLength, bucketIndex, noteIndex, baseNote) {
    const _dur = baseNote / bucketLength;
    const dur = `0:${_dur}`;
    const start = `0:${bucketIndex}`;
    const time = `${start} + 0:${noteIndex * _dur}`;
    return [dur, time];
  }

  stop() {
    Tone.Transport.stop();
  }


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

