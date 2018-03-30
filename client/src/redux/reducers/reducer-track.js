// TRACK REDUCER

import { defaultSynth } from '../default-data';

import { STOP, LOAD_PROJECT, CREATE_NEW_PROJECT } from '../actions/actions-project.js';

import {
  UPDATE_CURRENT_NOTE,
  MUTE,
  SOLO,
  UNMUTE,
  UNSOLO,
  CHANGE_BASE_NOTE,
  CHANGE_TRACK_NAME,
  UPDATE_TRACK_VOLUME,
} from '../actions/actions-track';

import {
  ADD_NOTE,
  DELETE_NOTE,
  MOVE_NOTE,
  ADD_BUCKET,
  DELETE_BUCKET,
  CLEAR_BUCKET,
  deleteNote,
  addNote
} from '../actions/actions-sequence';

import {
  UPDATE_ATTACK,
  UPDATE_DECAY,
  UPDATE_SUSTAIN,
  UPDATE_RELEASE,
  UPDATE_OSCILLATOR_TYPE
} from '../actions/actions-synth';

import { PASTE_BUCKET } from '../actions/actions-clipboard';

import SequenceReducer from './reducer-sequence';
import SynthReducer from './reducer-synth';

export default function TrackReducer(state = {}, action) {
  let newState;

  switch (action.type) {
  case MUTE:
    return mute(state);

  case UNMUTE:
    return unmute(state);

  case SOLO:
    return state.id === action.payload
      ? solo(state)
      : mute(state);

  case UNSOLO:
    return state.id === action.payload
      ? unsolo(state)
      : unmute(state);

  case UPDATE_CURRENT_NOTE:
    newState = { ...state };
    newState.currentNote = [ action.payload.bucketId, action.payload.noteIndex ];
    return newState;

  case DELETE_NOTE:
  case ADD_BUCKET:
  case DELETE_BUCKET:
  case CLEAR_BUCKET:
    newState = { ...state };
    newState.sequence = SequenceReducer(newState.sequence, action);
    return newState;

  case PASTE_BUCKET:
    action.payload.nextId = state.nextId;
    newState = { ...state };
    newState.sequence = SequenceReducer(newState.sequence, action);
    newState.nextId += action.payload.notes.length;
    return newState;

  case MOVE_NOTE:
    return moveNote(state, action);

  case ADD_NOTE:
    newState = { ...state };
    newState.sequence = SequenceReducer(newState.sequence, action);
    newState.nextId++;
    return newState;

  case CHANGE_BASE_NOTE:
    newState = { ...state };
    newState.baseNote = action.payload.baseNote;
    return newState;

  case CHANGE_TRACK_NAME:
    newState = { ...state };
    if (action.payload.name !== '')
      newState.name = action.payload.name;
    return newState;

  case STOP:
  case LOAD_PROJECT:
    newState = { ...state };
    newState.currentNote = [];
    // some older projects may have been saved before the addition of `synth`
    if (!newState.synth) {
      newState.synth = defaultSynth();
    }
    return newState;

  case UPDATE_TRACK_VOLUME:
    newState = { ...state };
    newState.volume = action.payload.volume;
    return newState;

  case CREATE_NEW_PROJECT:
    newState = { ...state };
    newState.sequence = [[], [], [], [], [], [], [], []];
    return newState;

  case UPDATE_ATTACK:
  case UPDATE_DECAY:
  case UPDATE_SUSTAIN:
  case UPDATE_RELEASE:
  case UPDATE_OSCILLATOR_TYPE:
    newState = { ...state };
    newState.synth = SynthReducer(newState.synth, action);
    return newState;

  default:
    return state;
  }
}

function moveNote(state, action) {
  const newState = { ...state };

  // if we're moving the note within the same track
  if (action.payload.source.trackId === action.payload.target.trackId) {
    newState.sequence = SequenceReducer(newState.sequence, action);
  }

  // if we're moving the note out of this track
  else if (action.payload.source.trackId === newState.id) {
    newState.sequence = delFromMove(newState, action.payload);
  }

  // if we're moving the note into this track
  else if (action.payload.target.trackId === newState.id) {
    newState.sequence = addFromMove(newState, action.payload);
    newState.nextId++;
  }

  return newState;
}

function delFromMove(state, payload) {
  const action = deleteNote({
    noteIndex: payload.source.index,
    bucketId: payload.source.bucket,
    trackId: payload.source.trackId
  });
  return SequenceReducer(state.sequence, action);
}

function addFromMove(state, payload) {
  const action = addNote({
    value: payload.source.value,
    id: state.nextId,
    index: payload.target.index,
    bucketId: payload.target.bucket,
    trackId: payload.target.trackId
  });
  return SequenceReducer(state.sequence, action);
}

function mute(trackData) {
  const newState = { ...trackData };
  newState.muted = true;
  newState.soloed = false;
  return newState;
}

function unmute(trackData) {
  const newState = { ...trackData };
  newState.muted = false;
  newState.soloed = false;
  return newState;
}

function solo(trackData) {
  const newState = { ...trackData };
  newState.soloed = true;
  newState.muted = false;
  return newState;
}

function unsolo(trackData) {
  const newState = { ...trackData };
  newState.soloed = false;
  newState.muted = false;
  return newState;
}
