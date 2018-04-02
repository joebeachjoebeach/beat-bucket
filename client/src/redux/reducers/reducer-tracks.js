// TRACKS REDUCER

import uuidv4 from 'uuid/v4';

import { STOP, LOAD_PROJECT, CREATE_NEW_PROJECT } from '../actions/actions-project.js';

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
  UPDATE_FILTER_TYPE,
  UPDATE_FILTER_RESONANCE
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
  UPDATE_OSCILLATOR_TYPE,
  UPDATE_OSCILLATOR_DETUNE
} from '../actions/actions-synth';

import { PASTE_BUCKET } from '../actions/actions-clipboard.js';

import TrackReducer from './reducer-track';

export default function TracksReducer(state, action) {
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
  case DELETE_NOTE:
  case ADD_NOTE:
  case ADD_BUCKET:
  case DELETE_BUCKET:
  case CLEAR_BUCKET:
  case CHANGE_BASE_NOTE:
  case CHANGE_TRACK_NAME:
  case UPDATE_TRACK_VOLUME:
  case UPDATE_FILTER_FREQUENCY:
  case UPDATE_FILTER_TYPE:
  case UPDATE_FILTER_RESONANCE:
  case PASTE_BUCKET:
  case UPDATE_ATTACK:
  case UPDATE_DECAY:
  case UPDATE_SUSTAIN:
  case UPDATE_RELEASE:
  case UPDATE_OSCILLATOR_TYPE:
  case UPDATE_OSCILLATOR_DETUNE:
    newState = { ...state };
    targetTrack = newState[action.payload.trackId];
    newState[action.payload.trackId] = TrackReducer(targetTrack, action);
    return newState;

  case MOVE_NOTE:
    return moveNote(state, action);

  case ADD_TRACK:
    return addTrack(state);

  case DELETE_TRACK:
    newState = { ...state };
    delete newState[action.payload.trackId];
    return newState;

  case STOP:
  case LOAD_PROJECT:
    newState = { ...state };
    Object.keys(newState).forEach(key => {
      newState[key] = TrackReducer(newState[key], action);
    });
    return newState;

  // we only get this deep with CREATE_NEW_PROJECT if we're leaving an unsaved project
  // with only one track. we want to keep that track's id, but reset its sequence
  case CREATE_NEW_PROJECT:
    return handleCreateNewProject(state, action);

  default:
    return state;

  }
}

function handleCreateNewProject(state, action) {
  const newState = { ...state };
  const id = Object.keys(newState)[0];
  newState[id] = TrackReducer(newState[id], action);
  return newState;
}

function moveNote(state, action) {
  const newState = { ...state };
  const sourceId = action.payload.source.trackId;
  const targetId = action.payload.target.trackId;

  if (sourceId !== targetId) {
    const targetTrack = newState[targetId];
    newState[targetId] = TrackReducer(targetTrack, action);
  }

  const sourceTrack = newState[sourceId];
  newState[sourceId] = TrackReducer(sourceTrack, action);
  return newState;
}

function getSoloedTrack(state) {
  const soloed = Object.values(state).filter(track => track.soloed);
  if (soloed.length > 0)
    return soloed[0].id;
  return -1;
}

function addTrack(state) {
  const newState = { ...state };
  const trackKeys = Object.keys(newState);
  const id = uuidv4();
  newState[id] = {
    name: `Track ${trackKeys.length + 1}`,
    sequence: [ [], [], [], [], [], [], [], [] ],
    nextId: 0,
    baseNote: 4,
    id: id,
    muted: false,
    soloed: false,
    currentNote: [],
    volume: 0
  };
  return newState;
}
