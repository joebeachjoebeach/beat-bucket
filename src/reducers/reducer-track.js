import { MUTE, SOLO, UNMUTE, UNSOLO, UPDATE_CURRENT_NOTE } from '../actions';

export default function TrackReducer(state = {}, action) {
  let newState;

  switch (action.type) {
  case MUTE:
    newState = { ...state };
    newState.data = TrackDataReducer(state.data, action);
    return newState;

  case UNMUTE:
    newState = { ...state };
    newState.data = TrackDataReducer(state.data, action);
    return newState;

  case SOLO:
    // console.log(state, action);
    newState = { ...state };
    newState.data = TrackDataReducer(state.data, action);
    return newState;

  case UNSOLO:
    newState = { ...state };
    newState.data = TrackDataReducer(state.data, action);
    return newState;

  case UPDATE_CURRENT_NOTE:
    newState = { ...state };
    newState.currentNote = [ action.payload.bucketIndex, action.payload.noteIndex ];
    return newState;

  default:
    return state;
  }
}

function TrackDataReducer(state = {}, action) {
  switch (action.type) {
  case MUTE:
    if (state.id === action.payload)
      return mute(state);
    return state;

  case UNMUTE:
    if (state.id === action.payload)
      return unmute(state);
    return state;

  case SOLO:
    if (state.id === action.payload)
      return solo(state);
    return mute(state);

  case UNSOLO:
    if (state.id === action.payload)
      return unsolo(state);
    return unmute(state);

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


/*
TRACK MODEL:
{
  data: {
    id: int,
    name: string,
    baseNote: float,
    sequence: array,
    muted: bool,
    soloed: bool
  },
  currentNote: arr,
}

*/
