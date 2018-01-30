// GLOBALS REDUCER

import {
  PLAY,
  STOP,
} from '../actions/actions-globals';

const dummy_data = {
  bpm: 75,
  playing: false,
  projectTitle: 'New Project'
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

  default:
    return state;
  }
}
