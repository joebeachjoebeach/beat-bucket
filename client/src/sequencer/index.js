// SEQUENCER CLASS

import Tone from 'tone';
import Track from './track';
import {
  selectTracks,
  selectPlaying,
  selectBpm,
  selectTracksLength,
  selectTestNote
} from '../redux/selectors';

import { observeStore } from '../redux/observers';

export default class Sequencer {
  constructor(store) {
    this.store = store;
    this.tracks = this.generateTracks();
    Tone.Transport.bpm.value = selectBpm(store.getState());

    this.synth = new Tone.Synth().toMaster();

    this.unsubscribePlaying = observeStore(
      store,
      selectPlaying,
      this.handlePlayingChange.bind(this)
    );
    
    this.unsubscribeChangeTracks = observeStore(
      store,
      selectTracksLength,
      this.handleTrackCountChange.bind(this)
    );

    this.unsubscribeTestNote = observeStore(
      store,
      selectTestNote,
      this.handleTestNoteChange.bind(this)
    );
  }

  // handles deleting or adding tracks
  handleTrackCountChange(newCount, oldCount) {
    const newTracks = selectTracks(this.store.getState());
    const newTrackIds = Object.keys(newTracks);

    // adding a new track
    if (newCount > oldCount || oldCount === undefined) {
      this.tracks.push(
        new Track(
          this.store,
          Math.max.apply(null, newTrackIds)
        )
      );
    }

    // deleting a track
    // the Track class itself will handle deleting itself (clearing Tone events etc)
    else
      this.tracks = this.tracks.filter(track => (!!newTracks[track.id]));
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

  // initialize Track objects for each track in the store
  generateTracks() {
    return Object.values(selectTracks(this.store.getState())).map(({ id }) => {
      return new Track(this.store, id);
    });
  }
}
