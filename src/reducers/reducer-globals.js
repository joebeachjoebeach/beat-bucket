import { PLAY, STOP, UPDATE_CURRENT_NOTE, UPDATE_CURRENT_TRACK } from '../actions';

const dummy_data = {
  bpm: 75,
  playing: false,
  currentNote: [0, 0],
  currentTrack: 0,
  octave: 0
};

export default function(state = dummy_data, action) {
  let newState;

  switch (action.type) {
  case PLAY:
    newState = { ...state };
    newState.playing = true;
    return newState;

  case STOP:
    newState = { ...state };
    newState.playing = false;
    return newState;

  case UPDATE_CURRENT_NOTE:
    newState = { ...state };
    newState.currentNote = action.payload;
    return newState;

  case UPDATE_CURRENT_TRACK:
    newState = { ...state };
    newState.currentTrack = action.payload;
    return newState;

  default:
    return state;

  }
}
