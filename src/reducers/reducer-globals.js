import { PLAY, STOP } from '../actions';

const dummy_data = {
  bpm: 75,
  playing: false,
  currentNote: null,
  currentTrack: 1
};

export default function(state = dummy_data, action) {
  const { bpm, playing, currentNote } = state;

  switch (action.type) {
  case PLAY:
    return { bpm, currentNote, playing: true };

  case STOP:
    return { bpm, currentNote, playing: false };

  default:
    return state;

  }
}
