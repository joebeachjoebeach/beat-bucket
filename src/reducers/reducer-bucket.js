import { ADD_NOTE, DELETE_NOTE, MOVE_NOTE } from '../actions';
import NotesReducer from './reducer-notes';

export default function BucketReducer(state, action) {
  let newState;
  switch(action.type) {

  case ADD_NOTE:
    newState = { ...state };
    newState.notes = addNote(newState.notes, action, newState.nextId);
    newState.nextId++;
    return newState;

  case DELETE_NOTE:
  case MOVE_NOTE:
    newState = { ...state };
    newState.notes = NotesReducer(newState.notes, action);
    return newState;


  default:
    return state;
  }
}

function addNote(state, action, id) {
  const newState = [ ...state ];
  const noteObject = { id, value: action.payload.note };
  newState.splice(action.payload.index, 0, noteObject);
  return newState;
}
