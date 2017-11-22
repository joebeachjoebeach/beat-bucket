import { MUTE, SOLO, UNMUTE, UNSOLO, UPDATE_CURRENT_NOTE, DROP_NOTE } from '../actions';
import TrackReducer from './reducer-track';

const dummy = {
  0: {
    name: 'Track 1',
    sequence: [
      ['C4', 'D4'],
      ['E4'],
      ['C5', 'B4', 'A4', 'G4', 'F4', 'E4', 'D4'],
      ['A4'],
      ['G4', 'F4', 'E4', 'D4'],
      ['C4'],
      ['C4', 'D4', 'E4'],
      ['C4']
    ],
    baseNote: 1,
    id: 0,
    muted: false,
    soloed: false,
    currentNote: [],
  },
  1: {
    name: 'Track 2',
    sequence: [
      ['C5', 'D5', 'E5']
    ],
    baseNote: 0.5,
    id: 1,
    muted: false,
    soloed: false,
    currentNote: [],
  }
};

export default function TracksReducer(state = dummy, action) {
  let newState;
  let targetTrack;

  switch (action.type) {
  case MUTE:
    newState = { ...state };
    targetTrack = newState[action.payload];
    newState[action.payload] = TrackReducer(targetTrack, action);
    return newState;

  case UNMUTE:
    newState = { ...state };
    targetTrack = newState[action.payload];
    // only unmute the track if no other tracks are soloed
    if (!~getSoloedTrack(state))
      newState[action.payload] = TrackReducer(targetTrack, action);
    return newState;

  case SOLO:
    newState = { ...state };
    targetTrack = newState[action.payload.id];
    newState = {};
    Object.values(state).forEach(track => {
      newState[track.id] = TrackReducer(track, action);
    });
    return newState;

  case UNSOLO:
    newState = {};
    Object.values(state).forEach(track => {
      newState[track.id] = TrackReducer(track, action);
    });
    return newState;

  case UPDATE_CURRENT_NOTE:
    newState = { ...state };
    targetTrack = newState[action.payload.trackId];
    newState[action.payload.trackId] = TrackReducer(targetTrack, action);
    return newState;

  case DROP_NOTE:
    newState = { ...state };
    targetTrack = newState[action.payload.trackId];
    newState[action.payload.trackId] = TrackReducer(targetTrack, action);
    return newState;

  default:
    return state;

  }
}

function getSoloedTrack(state) {
  const soloed = Object.values(state).filter(track => track.soloed);
  if (soloed.length > 0)
    return soloed[0].id;
  return -1;
}
