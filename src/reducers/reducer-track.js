import {
  MUTE,
  SOLO,
  UNMUTE,
  UNSOLO,
  UPDATE_CURRENT_NOTE,
  ADD_NOTE,
  DELETE_NOTE,
  MOVE_NOTE } from '../actions';

import SequenceReducer from './reducer-sequence';

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
    newState.currentNote = [ action.payload.bucketIndex, action.payload.noteIndex ];
    return newState;

  case DELETE_NOTE:
  case MOVE_NOTE:
    newState = { ...state };
    newState.sequence = SequenceReducer(newState.sequence, action);
    return newState;

  case ADD_NOTE:
    newState = { ...state };
    newState.sequence = SequenceReducer(newState.sequence, action);
    newState.nextId++;
    return newState;


  default:
    return state;
  }
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

function dropNote(note, bucketId, trackData) {
  const newState = { ...trackData };
  const newSequence = [ ...newState.sequence ];
  newSequence[bucketId].push(note);
  newState.sequence = newSequence;
  return newState;
}
