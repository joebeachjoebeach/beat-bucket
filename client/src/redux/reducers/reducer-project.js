// PROJECT REDUCER

import {
  PLAY,
  STOP,
  CHANGE_PROJECT_TITLE,
  UPDATE_TEST_NOTE
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

const dummy_data = {
  bpm: 75,
  playing: false,
  projectTitle: 'New Project',
  testNote: { on: false, value: '' },
  tracks: {
    0: {
      name: 'Track 1',
      sequence: [
        [{ id: 0, value: 'C4'}, { id: 1, value: 'D4' }],
        [{ id: 2, value: 'E4'}, { id: 3, value: 'F4'}],
        [{ id: 5, value: 'E4'}, { id: 6, value: 'rest'}],
        [{ id: 7, value: 'rest'}, { id: 8, value: 'D4'}],
      ],
      nextId: 9,
      baseNote: 4,
      id: 0,
      muted: false,
      soloed: false,
      currentNote: [],
      volume: 0
    },
    1: {
      name: 'Track 2',
      sequence: [
        [{ id: 0, value: 'C5'}, { id: 1, value: 'D5' }, { id: 2, value: 'E5' }]
      ],
      nextId: 3,
      baseNote: 2,
      id: 1,
      muted: false,
      soloed: false,
      currentNote: [],
      volume: 0
    }
  }
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

  default:
    return state;
  }
}
