import { TOGGLE_MUTE, TOGGLE_SOLO, UPDATE_CURRENT_NOTE } from '../actions';

export default function TrackReducer(state = {}, action) {
  let newState;

  switch (action.type) {
  case TOGGLE_MUTE:
    newState = { ...state };
    newState.data = TrackDataReducer(state.data, action);
    return newState;

  case TOGGLE_SOLO:
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
  case TOGGLE_MUTE:
    return toggleMute(state);

  case TOGGLE_SOLO:
    return toggleSolo(state);

  default:
    return state;
  }
}

function toggleMute(trackData) {
  const newState = { ...trackData };
  newState.muted = !newState.muted;
  return newState;
}

function toggleSolo(trackData) {
  const newState = { ...trackData };
  newState.soloed = !newState.soloed;
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
