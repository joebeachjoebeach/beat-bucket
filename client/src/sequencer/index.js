// SEQUENCER CLASS

import Tone from 'tone';
import Track from './track';
import {
  selectTracks,
  selectPlaying,
  selectBPM,
  selectTestNote,
  selectProjectIdAndTrackCount
} from '../redux/selectors';

import { observeStore } from '../redux/observers';

export default class Sequencer {
  constructor(store) {
    this.store = store;
    // handleTrackCountChange will automatically run when the subscriptions are
    // instantiated, which will fill up this.tracks
    this.tracks = [];
    Tone.Transport.bpm.value = selectBPM(store.getState());

    this.synth = new Tone.Synth().toMaster();

    this.subscriptions = [
      observeStore(store, selectPlaying, this.handlePlayingChange.bind(this)),
      observeStore(store, selectTestNote, this.handleTestNoteChange.bind(this)),
      observeStore(store, selectBPM, this.handleBPMChange.bind(this)),
      observeStore(
        store,
        selectProjectIdAndTrackCount,
        this.handleProjectIdOrTrackCountChange.bind(this)
      )
    ];
  }

  // play or stop the loop when global 'playing' changes
  handlePlayingChange(playing) {
    playing
      ? Tone.Transport.start('+0.1')
      : Tone.Transport.stop();
  }

  handleTestNoteChange({ on, value }) {
    on
      ? this.synth.triggerAttack(value)
      : this.synth.triggerRelease();
  }

  handleBPMChange(bpm) {
    Tone.Transport.bpm.value = bpm;
  }

  // if the project id changes, then we've loaded a new project, so we need to reload.
  // if the track count changes, we've added or deleted tracks, and the simplest way to
  // handle that is to reload all the tracks
  handleProjectIdOrTrackCountChange() {
    this.tracks.forEach(track => { track.deleteSelf(); });
    this.tracks = this.generateTracks();
  }

  // initialize Track objects for each track in the store
  generateTracks() {
    return Object.values(selectTracks(this.store.getState())).map(({ id }) => {
      return new Track(this.store, id);
    });
  }
}
