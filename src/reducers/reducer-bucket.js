import { ADD_NOTE, DELETE_NOTE, MOVE_NOTE } from '../actions';

export default function BucketReducer(state, action, id) {
  let newState;
  const { payload } = action;
  switch(action.type) {

  case ADD_NOTE:
    // newState = [ ...state ];
    // // newState.notes = addNote(newState.notes, action, newState.nextId);
    // // newState.nextId++;
    // const noteObject = { id, value: payload.note };
    // newState.splice(payload.index, 0, noteObject);
    // return newState;
    return addNote(state, payload, id);

  case DELETE_NOTE:
    newState = [ ...state ];
    newState.splice(payload.noteIndex, 1);
    return newState;

  case MOVE_NOTE:
    newState = [ ...state ];
    newState.splice(payload.target.index, 0, newState.splice(payload.source.index, 1)[0]);
    return newState;


  default:
    return state;
  }
}

function addNote(state, payload, id) {
  const newState = [ ...state ];
  let noteObject;
  if (payload.id === null) {
    noteObject = { id, value: payload.note };
  }
  else
    noteObject = { id: payload.id, value: payload.note };

  newState.splice(payload.index, 0, noteObject);
  return newState;
}
