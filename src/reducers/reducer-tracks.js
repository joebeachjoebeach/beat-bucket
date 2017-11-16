import { TOGGLE_MUTE, TOGGLE_SOLO, UPDATE_CURRENT_NOTE } from '../actions';
import TrackReducer from './reducer-track';

const dummy = {
  0: {
    data: {
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
      soloed: false
    },
    currentNote: [],
  },
  1: {
    data: {
      name: 'Track 2',
      sequence: [
        ['C5', 'D5', 'E5']
      ],
      baseNote: 0.5,
      id: 1,
      muted: false,
      soloed: false
    },
    currentNote: [],
  }
};

export default function TracksReducer(state = dummy, action) {
  let newState;
  let targetTrack;

  switch (action.type) {
  case TOGGLE_MUTE:
    newState = { ...state };
    targetTrack = newState[action.payload];
    newState[action.payload] = TrackReducer(targetTrack, action);
    return newState;

  // TODO: figure out how this is *supposed* to work
  // does it also *mute* the other tracks?
  // it also needs to make sure any currently soloed tracks are unsoloed
  // compare it to a DAW like ableton
  case TOGGLE_SOLO:
    newState = { ...state };
    targetTrack = newState[action.payload];
    newState[action.payload] = TrackReducer(targetTrack, action);
    return newState;

  case UPDATE_CURRENT_NOTE:
    newState = { ... state };
    targetTrack = newState[action.payload.trackId];
    newState[action.payload.trackId] = TrackReducer(targetTrack, action);
    return newState;

  default:
    return state;

  }
}

