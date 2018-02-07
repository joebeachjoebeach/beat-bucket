// BUCKET REDUCER

import { ADD_NOTE, DELETE_NOTE, MOVE_NOTE } from '../actions/actions-sequence';

export default function BucketReducer(state, action, id) {
  let newState;
  const { payload } = action;
  switch(action.type) {

  case ADD_NOTE:
    return addNote(state, payload, id);

  case DELETE_NOTE:
    return deleteNote(state, action.payload);

  case MOVE_NOTE:
    newState = [ ...state ];
    newState.splice(
      payload.target.index,
      0,
      newState.splice(payload.source.index, 1)[0]
    );
    return newState;

  default:
    return state;
  }
}

function addNote(state, payload) {
  const newState = [ ...state ];
  const noteObject = { id: payload.id, value: payload.value };
  newState.splice(payload.index, 0, noteObject);
  return newState;
}

function deleteNote(state, payload) {
  const newState = [ ...state ];
  const index = newState.findIndex(el => el.id === payload.noteId);
  newState.splice(index, 1);
  return newState;
}
