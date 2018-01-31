// GLOBALS REDUCER

import {
  PLAY,
  STOP,
  CHANGE_PROJECT_TITLE,
  UPDATE_TEST_NOTE
} from '../actions/actions-globals';

const dummy_data = {
  bpm: 75,
  playing: false,
  projectTitle: 'New Project',
  testNote: { on: false, value: '' }
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

  case CHANGE_PROJECT_TITLE:
    newState = { ...state };
    newState.projectTitle = action.payload.title;
    return newState;

  case UPDATE_TEST_NOTE:
    newState = { ...state };
    newState.testNote = action.payload;
    return newState;

  default:
    return state;
  }
}
