import Tone from 'tone';
import Track from './track';
import {
  observeStore,
  selectTracks,
  selectPlaying,
  selectBpm,
  selectTracksLength,
  observeTrackChange } from '../store';

export default class Sequencer {
  constructor(store) {
    this.store = store;
    this.unsubscribePlaying = observeStore(
      store,
      selectPlaying,
      this.handlePlayingChange.bind(this)
    );
    
    this.tracks = this.generateTracks();
    Tone.Transport.bpm.value = selectBpm(store.getState());

    this.unsubscribeChangeTracks = observeTrackChange(
      store,
      this.handleNewTrack.bind(this),
      this.handleDeleteTrack.bind(this)
    );
  }

  // play or stop the loop when global 'playing' changes
  handlePlayingChange(playing) {
    playing
      ? Tone.Transport.start('+0.1')
      : Tone.Transport.stop();
  }

  // remove the reference to the deleted track in the track list
  handleDeleteTrack(newState, oldState) {
    let deletedTrackId;
    for (let id in oldState) {
      if (!newState[id])
        deletedTrackId = id;
    }
    const targetTrack = this.tracks.filter(track => track.id == deletedTrackId)[0];
    // targetTrack.deleteSelf();
    this.tracks.splice(this.tracks.indexOf(targetTrack), 1);
  }

  // create a new Track when a new track is added to the store
  handleNewTrack(newState, oldState) {
    const newId = Math.max.apply(null, Object.keys(newState));
    this.tracks.push(new Track(this.store, newId));
  }

  // initialize Track objects for each track in the store
  generateTracks() {
    return Object.values(selectTracks(this.store.getState())).map(({ id }) => {
      return new Track(this.store, id);
    });
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

