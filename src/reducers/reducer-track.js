import {
  MUTE,
  SOLO,
  UNMUTE,
  UNSOLO,
  UPDATE_CURRENT_NOTE,
  DROP_NOTE,
  DELETE_NOTE,
  MOVE_NOTE } from '../actions';

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

  case DROP_NOTE:
    return dropNote(action.payload.note, action.payload.bucketId, state);

  case DELETE_NOTE:
    return deleteNote(action.payload, state);

  case MOVE_NOTE:
    return moveNote(action.payload, state);

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

function deleteNote({ noteIndex, bucketId }, trackData) {
  const newState = { ...trackData };
  const newSequence = [ ...newState.sequence ];
  const newBucket = [ ...newSequence[bucketId] ];
  newBucket.splice(noteIndex, 1);
  newSequence[bucketId] = newBucket;
  newState.sequence = newSequence;
  return newState;
}

function moveNote({ originalIndex, newIndex, bucketId }, trackData) {
  const newState = { ...trackData };
  const newSequence = [ ...newState.sequence ];
  const newBucket = { ...newSequence[bucketId] };
  const newNotes = [ ...newBucket.notes ];
  newNotes.splice(newIndex, 0, newNotes.splice(originalIndex, 1)[0]);
  newBucket.notes = newNotes;
  newSequence[bucketId] = newBucket;
  newState.sequence = newSequence;
  return newState;
}
