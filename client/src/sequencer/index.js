// SEQUENCER CLASS

import Tone from 'tone';
import Track from './track';
import {
  selectTracks,
  selectPlaying,
  selectBpm,
  selectTracksLength,
  selectTestNote,
  selectProjectId
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

    this.unsubscribeProjectId = observeStore(
      store,
      selectProjectId,
      this.handleProjectIdChange.bind(this)
    );
  }

  // handles deleting or adding tracks
  // handleTrackCountChange(newCount, oldCount) {
  //   const newTracks = selectTracks(this.store.getState());
  //   const newTrackIds = Object.keys(newTracks);

  //   // adding a new track
  //   if (newCount > oldCount || oldCount === undefined) {
  //     this.tracks.push(
  //       new Track(
  //         this.store,
  //         Math.max.apply(null, newTrackIds)
  //       )
  //     );
  //   }

  //   // deleting a track
  //   // the Track class itself will handle deleting itself (clearing Tone events etc)
  //   else
  //     this.tracks = this.tracks.filter(track => (!!newTracks[track.id]));
  // }

  // if the user adds or deletes tracks, it's simplest to just reload all the tracks
  handleTrackCountChange() {
    console.log('track count change');
    this.reloadTracks();
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

  // if the project id changes, that means we've loaded a new project
  // so we need to reload all the tracks
  handleProjectIdChange() {
    console.log('project id change');
    this.reloadTracks();
  }

  reloadTracks() {
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
