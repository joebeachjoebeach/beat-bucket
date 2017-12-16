// GLOBALS REDUCER

import {
  PLAY,
  STOP,
  UPDATE_CURRENT_TRACK,
  INCREMENT_OCTAVE,
  DECREMENT_OCTAVE
} from '../actions/actions-globals';

const dummy_data = {
  bpm: 75,
  playing: false,
  currentTrack: 0,
  octave: 4
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

  case UPDATE_CURRENT_TRACK:
    newState = { ...state };
    newState.currentTrack = action.payload;
    return newState;

  case INCREMENT_OCTAVE:
    newState = { ...state };
    newState.octave++;
    return newState;

  case DECREMENT_OCTAVE:
    newState = { ...state };
    newState.octave--;
    return newState;

  default:
    return state;

  }
}
