import { DELETE_NOTE, MOVE_NOTE, ADD_NOTE, deleteNote, addNote } from '../actions';
import BucketReducer from './reducer-bucket';

export default function SequenceReducer(state, action) {
  let newState;
  const { payload, type } = action;
  switch (type) {

  case DELETE_NOTE:
    newState = [ ...state ];
    newState[payload.bucketId] = BucketReducer(newState[payload.bucketId], action);
    return newState;

  case MOVE_NOTE:
    newState = [ ...state ];
    if (payload.source.bucket === payload.target.bucket) {
      newState[payload.source.bucket] = BucketReducer(newState[payload.source.bucket], action);
    }
    else {
      newState[payload.source.bucket] = delFromMove(newState[payload.source.bucket], payload);
      newState[payload.target.bucket] = addFromMove(newState[payload.target.bucket], payload);
    }
    return newState;

  case ADD_NOTE:
    newState = [ ...state ];
    newState[payload.bucketId] = BucketReducer(newState[payload.bucketId], action);
    return newState;


  default:
    return state;
  }
}

function delFromMove(state, payload) {
  const action = deleteNote({
    noteIndex: payload.source.index,
    bucketId: payload.source.bucket,
    trackId: payload.track
  });
  return BucketReducer(state, action);
}

function addFromMove(state, payload) {
  const action = addNote({
    note: payload.source.note,
    id: payload.source.id,
    index: payload.target.index,
    bucketId: payload.target.bucket,
    trackId: payload.track
  });
  return BucketReducer(state, action);
}





// function move(state, action) {
//   const { payload } = action;
//   const newState = [ ...state ];
//   if (payload.source.bucket === payload.target.bucket)
//     newState[payload.source.bucket] = BucketReducer(newState[payload.source.bucket], action);
// }

// function swapNotes(state, origin, destination) {
//   const newState = { ...state };
//   const newNotes = [ ...newState.notes ];
//   newNotes.splice(destination, 0, newNotes.splice(origin, 1)[0]);
//   newState.notes = newNotes;
//   return newState;
// }

// function deleteNote(state, index) {
//   const newState = { ...state };
//   const newNotes = [ ...newState.notes ];
//   newNotes.splice(index, 1);
//   newState.notes = newNotes;
//   return newState;
// }

// function addNote(state, note, index) {
//   const newState = { ...state };
//   const newNotes = [ ...newState.notes ];
//   newNotes.splice(index, 0, note);
// }

