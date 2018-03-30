// PROJECT REDUCER

import { SET_USER, SAVE } from '../../redux/actions/actions-user';
import { mario, starterData } from '../default-data';

import {
  PLAY,
  STOP,
  CHANGE_PROJECT_NAME,
  UPDATE_TEST_NOTE,
  LOAD_PROJECT,
  DELETE_PROJECT,
  CREATE_NEW_PROJECT,
  CHANGE_BPM,
  SHARE,
  UNSHARE
} from '../actions/actions-project';

import {
  ADD_TRACK,
  DELETE_TRACK
} from '../actions/actions-tracks';

import {
  UPDATE_CURRENT_NOTE,
  MUTE,
  SOLO,
  UNMUTE,
  UNSOLO,
  CHANGE_BASE_NOTE,
  CHANGE_TRACK_NAME,
  UPDATE_TRACK_VOLUME,
  UPDATE_FILTER_FREQUENCY,
} from '../actions/actions-track.js';

import {
  ADD_NOTE,
  DELETE_NOTE,
  MOVE_NOTE,
  ADD_BUCKET,
  DELETE_BUCKET,
  CLEAR_BUCKET
} from '../actions/actions-sequence.js';

import {
  UPDATE_ATTACK,
  UPDATE_DECAY,
  UPDATE_SUSTAIN,
  UPDATE_RELEASE,
  UPDATE_OSCILLATOR_TYPE
} from '../actions/actions-synth';

import { PASTE_BUCKET } from '../actions/actions-clipboard';

import TracksReducer from './reducer-tracks.js';

export default function(state = mario(), action) {
  let newState;

  switch (action.type) {
  case PLAY:
    newState = { ...state };
    newState.playing = true;
    return newState;

  case STOP:
    newState = { ...state };
    newState.playing = false;
    newState.tracks = TracksReducer(newState.tracks, action);
    return newState;

  case CHANGE_PROJECT_NAME:
    newState = { ...state };
    if (action.payload.name !== '')
      newState.name = action.payload.name;
    return newState;

  case UPDATE_TEST_NOTE:
    newState = { ...state };
    newState.testNote = action.payload;
    return newState;

  case ADD_TRACK:
  case DELETE_TRACK:
  case UPDATE_CURRENT_NOTE:
  case MUTE:
  case SOLO:
  case UNMUTE:
  case UNSOLO:
  case CHANGE_BASE_NOTE:
  case CHANGE_TRACK_NAME:
  case UPDATE_TRACK_VOLUME:
  case UPDATE_FILTER_FREQUENCY:
  case ADD_NOTE:
  case DELETE_NOTE:
  case MOVE_NOTE:
  case ADD_BUCKET:
  case DELETE_BUCKET:
  case CLEAR_BUCKET:
  case PASTE_BUCKET:
  case UPDATE_ATTACK:
  case UPDATE_DECAY:
  case UPDATE_SUSTAIN:
  case UPDATE_RELEASE:
  case UPDATE_OSCILLATOR_TYPE:
    newState = { ...state };
    newState.tracks = TracksReducer(newState.tracks, action);
    return newState;

  case SAVE:
    if (state.hasOwnProperty(action.payload.id))
      return state;
    newState = { ...state };
    newState.id = action.payload.id;
    return newState;

  case LOAD_PROJECT:
    newState = action.payload.data;
    newState.id = action.payload.id;
    newState.playing = false;
    newState.testNote = { on: false, value: '' };
    newState.tracks = TracksReducer(newState.tracks, action);
    return newState;

  case DELETE_PROJECT:
    return generateEmptyProject();

  case CREATE_NEW_PROJECT:
    return simulateEmptyProject(state, action);

  case SET_USER:
    if (!action.payload.email && !action.payload.id)
      return simulateEmptyProject(state, action);
    return state;

  case CHANGE_BPM:
    newState = { ...state };
    newState.bpm = action.payload.bpm;
    return newState;

  case SHARE:
  case UNSHARE:
    newState = { ...state };
    newState.shared = !state.shared;
    return newState;

  default:
    return state;
  }
}

function generateEmptyProject() {
  const newState = { ...starterData() };
  const [ id1, id2 ] = Object.keys(newState.tracks);
  delete newState.tracks[id2];
  newState.tracks[id1].sequence = [[], [], [], [], [], [], [], []];
  return newState;
}

function simulateEmptyProject(state, action) {
  if (state.id || Object.keys(state.tracks).length !== 1)
    return generateEmptyProject();
  const newState = { ...state };
  newState.tracks = TracksReducer(newState.tracks, action);
  return newState;
}
