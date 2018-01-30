// GLOBALS REDUCER

import {
  PLAY,
  STOP,
  CHANGE_PROJECT_TITLE
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

  case CHANGE_PROJECT_TITLE:
    newState = { ...state };
    newState.projectTitle = action.payload.title;
    return newState;

  default:
    return state;
  }
}
