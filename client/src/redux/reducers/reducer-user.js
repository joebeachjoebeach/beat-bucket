// USER REDUCER
import { SET_USER } from '../actions/actions-user.js';

export default function(state = { email: null, id: null }, action) {
  let newState;

  switch (action.type) {
  case SET_USER:
    newState = { ...state };
    newState.email = action.payload.email;
    newState.id = action.payload.id;
    return newState;

  default:
    return state;
  }
}
