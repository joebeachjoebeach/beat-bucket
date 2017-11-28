import { DELETE_NOTE, MOVE_NOTE } from '../actions';

export default function NotesReducer(state, action) {
  const { payload } = action;
  let newState;

  switch(action.type) {
  case MOVE_NOTE:
    newState = [ ...state ];
    newState.splice(payload.target.index, 0, newState.splice(payload.source.index, 1)[0]);
    return newState;

  case DELETE_NOTE:
    newState = [ ...state ];
    newState.splice(payload.noteIndex, 1);
    return newState;

  default:
    return state;
  }
}


// function addNote(state, note, index) {
//   const newState = [ ...state ];
//   const noteObject = 
// }
