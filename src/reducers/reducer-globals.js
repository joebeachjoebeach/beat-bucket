import { PLAY, STOP } from '../actions';

export default function(state = { bpm: 75, playing: false, currentNote: null }, action) {
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
