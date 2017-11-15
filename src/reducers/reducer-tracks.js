import { TOGGLE_MUTE, TOGGLE_SOLO } from '../actions';


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
    soloed: false
  },
  1: {
    name: 'Track 2',
    sequence: [
      ['C5', 'D5', 'E5']
    ],
    baseNote: 0.5,
    id: 1,
    muted: false,
    soloed: false
  }
};

export default function TracksReducer(state = dummy, action) {
  let newState;

  // in both of these cases I am making a SHALLOW copy, and the nested objects (each track)
  // are being re-referenced, NOT COPIED
  switch (action.type) {
  case TOGGLE_MUTE:
    newState = {};
    Object.entries(state).forEach(([ key, value ]) => {
      let currentTrack = Object.assign({}, value);
      if (value.id === action.payload)
        currentTrack.muted = !currentTrack.muted;
      newState[key] = currentTrack;
    });

    return newState;

  case TOGGLE_SOLO:
    newState = {};
    Object.entries(state).forEach(({ key, value }) => {
      newState[key] = value;

      if (key === action.payload) {
        newState[key].muted = false;
        newState[key].soloed = true;
      }
      else {
        newState[key].muted = true;
        newState[key].soloed = false;
      }
    });
    return newState;

  default:
    return state;

  }
}

