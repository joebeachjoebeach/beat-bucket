// TRACKS REDUCER

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
  CHANGE_BASE_NOTE
} from '../actions/actions-track.js';

import {
  ADD_NOTE,
  DELETE_NOTE,
  MOVE_NOTE,
  ADD_BUCKET,
  DELETE_BUCKET
} from '../actions/actions-sequence.js';

import TrackReducer from './reducer-track';

// dummy data to initialize the app
const dummy = {
  0: {
    name: 'Track 1',
    sequence: [
      [{ id: 0, value: 'C4'}, { id: 1, value: 'D4' }],
      [{ id: 2, value: 'E4'}, { id: 3, value: 'E4'}, { id: 4, value: 'E4'}],
      [{ id: 5, value: 'E4'}, { id: 6, value: 'rest'}],
      [{ id: 7, value: 'rest'}, { id: 8, value: 'D4'}],
    ],
    nextId: 0,
    baseNote: 1,
    id: 0,
    muted: false,
    soloed: false,
    currentNote: []
  }
};

export default function TracksReducer(state = dummy, action) {
  let newState;
  let targetTrack;

  switch (action.type) {
  case MUTE:
    newState = { ...state };
    targetTrack = newState[action.payload];
    newState[action.payload] = TrackReducer(targetTrack, action);
    return newState;

  case UNMUTE:
    newState = { ...state };
    targetTrack = newState[action.payload];
    // only unmute the track if no other tracks are soloed
    if (!~getSoloedTrack(state))
      newState[action.payload] = TrackReducer(targetTrack, action);
    return newState;

  case SOLO:
  case UNSOLO:
    newState = {};
    Object.values(state).forEach(track => {
      newState[track.id] = TrackReducer(track, action);
    });
    return newState;

  case UPDATE_CURRENT_NOTE:
  case MOVE_NOTE:
  case DELETE_NOTE:
  case ADD_NOTE:
  case ADD_BUCKET:
  case DELETE_BUCKET:
  case CHANGE_BASE_NOTE:
    newState = { ...state };
    targetTrack = newState[action.payload.trackId];
    newState[action.payload.trackId] = TrackReducer(targetTrack, action);
    return newState;

  case ADD_TRACK:
    return addTrack(state);

  case DELETE_TRACK:
    newState = { ...state };
    delete newState[action.payload.trackId];
    return newState;

  default:
    return state;

  }
}

function getSoloedTrack(state) {
  const soloed = Object.values(state).filter(track => track.soloed);
  if (soloed.length > 0)
    return soloed[0].id;
  return -1;
}

function addTrack(state) {
  const newState = { ...state };
  const id = Math.max.apply(null, Object.keys(newState)) + 1;
  newState[id] = {
    name: `Track ${id + 1}`,
    sequence: [ [], [], [], [], [], [], [], [] ],
    nextId: 0,
    baseNote: 1,
    id: id,
    muted: false,
    soloed: false,
    currentNote: []
  };
  return newState;
}
