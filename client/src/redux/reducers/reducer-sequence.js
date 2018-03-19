// SEQUENCE REDUCER

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

import BucketReducer from './reducer-bucket';

export default function SequenceReducer(state, action) {
  let newState;
  const { payload, type } = action;
  switch (type) {

  case ADD_NOTE:
  case DELETE_NOTE:
  case CLEAR_BUCKET:
    newState = [ ...state ];
    newState[payload.bucketId] = BucketReducer(newState[payload.bucketId], action);
    return newState;

  // case DELETE_NOTE:
  //   newState = [ ...state ];
  //   newState[payload.bucketId] = BucketReducer(newState[payload.bucketId], action);
  //   return newState;

  case MOVE_NOTE:
    newState = [ ...state ];

    // if moving within the same bucket
    if (payload.source.bucket === payload.target.bucket) {
      newState[payload.source.bucket]
        = BucketReducer(newState[payload.source.bucket], action);
    }
    // if moving from one bucket to another
    else {
      newState[payload.source.bucket]
        = delFromMove(newState[payload.source.bucket], payload);

      newState[payload.target.bucket]
        = addFromMove(newState[payload.target.bucket], payload);
    }
    return newState;

  case ADD_BUCKET:
    return [ ...state, [] ];

  case DELETE_BUCKET:
    newState = [ ...state ];
    newState.splice(action.payload.bucketId, 1);
    return newState;

  default:
    return state;
  }
}

function delFromMove(state, payload) {
  const action = deleteNote({
    noteIndex: payload.source.index,
    // noteId: payload.source.id,
    bucketId: payload.source.bucket,
    trackId: payload.track
  });
  return BucketReducer(state, action);
}

function addFromMove(state, payload) {
  const action = addNote({
    value: payload.source.value,
    id: payload.source.id,
    index: payload.target.index,
    bucketId: payload.target.bucket,
    trackId: payload.track
  });
  return BucketReducer(state, action);
}
