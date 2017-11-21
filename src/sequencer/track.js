import Tone from 'tone';
import { createPartEvents } from './utils';
import { observeStore, selectTracks, selectCurrentTrack, selectMuted } from '../store';
import { updateCurrentNote } from '../actions';

export default class Track {
  constructor(store, id) {
    this.store = store;
    this.id = id;
    this.muted = false;
    this.current = false;
    this.synth = new Tone.Synth().toMaster();

    // get sequence and baseNote of track from the store
    const { sequence, baseNote } = selectTracks(store.getState())[id].data;
    this.sequence = sequence;
    this.baseNote = baseNote;

    this.part = this.initPart();

    this.unsubscribeCurrent = observeStore(
      store,
      selectCurrentTrack,
      this.onCurrentChange.bind(this)
    );

    this.unsubscribeMuted = observeStore(
      store,
      selectMuted(id),
      this.onMutedChange.bind(this)
    );

    // console.log(this.synth.volume.value);
  }

  initPart() {
    const part = new Tone.Part(
      this.partProcessor.bind(this),
      createPartEvents(this.sequence, this.baseNote)
    );

    part.start(0);
    part.loop = true;
    part.loopEnd = `${this.sequence.length}*0:${this.baseNote}`;

    return part;
  }

  partProcessor(time, { note, dur, bucketIndex, noteIndex }) {
    this.synth.triggerAttackRelease(note, dur, time);
    this.dispatchCurrentNote(bucketIndex, noteIndex);
  }

  dispatchCurrentNote(bucketIndex, noteIndex) {
    this.store.dispatch(
      updateCurrentNote({ bucketIndex, noteIndex, trackId: this.id })
    );
  }

  onCurrentChange(currentTrack) {
    currentTrack === this.id
      ? this.current = true
      : this.current = false;
  }

  onMutedChange(muted) {
    muted
      ? this.synth.volume.value = -Infinity
      : this.synth.volume.value = 0;
  }

}
