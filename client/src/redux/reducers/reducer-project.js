// PROJECT REDUCER

import uuidv4 from 'uuid/v4';

import {
  PLAY,
  STOP,
  CHANGE_PROJECT_NAME,
  UPDATE_TEST_NOTE,
  SET_PROJECT_ID,
  LOAD_PROJECT,
  DELETE_PROJECT,
  CREATE_NEW_PROJECT
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
  UPDATE_TRACK_VOLUME
} from '../actions/actions-track.js';

import {
  ADD_NOTE,
  DELETE_NOTE,
  MOVE_NOTE,
  ADD_BUCKET,
  DELETE_BUCKET
} from '../actions/actions-sequence.js';

import TracksReducer from './reducer-tracks.js';

export default function(state = starterData(), action) {
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
  case ADD_NOTE:
  case DELETE_NOTE:
  case MOVE_NOTE:
  case ADD_BUCKET:
  case DELETE_BUCKET:
    newState = { ...state };
    newState.tracks = TracksReducer(newState.tracks, action);
    return newState;

  case SET_PROJECT_ID:
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
    if (state.id || Object.keys(state.tracks).length !== 1)
      return generateEmptyProject();
    newState = { ...state };
    newState.tracks = TracksReducer(newState.tracks, action);
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

function starterData() {
  const id1 = uuidv4();
  const id2 = uuidv4();
  return {
    bpm: 75,
    playing: false,
    name: 'New Project',
    testNote: { on: false, value: '' },
    shared: false,
    tracks: {
      [id1]: {
        name: 'Track 1',
        sequence: [
          [{ id: 0, value: 'C4'}, { id: 1, value: 'D4' }],
          [{ id: 2, value: 'E4'}, { id: 3, value: 'F4'}],
          [{ id: 5, value: 'E4'}, { id: 6, value: 'rest'}],
          [{ id: 7, value: 'rest'}, { id: 8, value: 'D4'}],
        ],
        nextId: 9,
        baseNote: 4,
        id: id1,
        muted: false,
        soloed: false,
        currentNote: [],
        volume: 0
      },
      [id2]: {
        name: 'Track 2',
        sequence: [
          [{ id: 0, value: 'C5'}, { id: 1, value: 'D5' }, { id: 2, value: 'E5' }]
        ],
        nextId: 3,
        baseNote: 2,
        id: id2,
        muted: false,
        soloed: false,
        currentNote: [],
        volume: 0
      }
    }
  };
}
